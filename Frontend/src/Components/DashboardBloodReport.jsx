import { Droplets, TrendingUp, TrendingDown, Plus, Minus, X, Info } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from "recharts";
import clsx from "clsx";
import { useState, useEffect } from "react";
import BloodComponents from "./assets/BloodComponents";
import axios from "axios";
import InitialBloodData from '../Components/assets/InitailComponent'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const labels = {
    hemoglobin: "Hemoglobin",
    rbc: "RBC",
    wbc: "WBC",
    platelets: "Platelets",
    hematocrit: "Hematocrit",
    glucose: "Glucose",
    cholesterol: "Cholesterol",
    triglycerides: "Triglycerides",
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
        return (
            <div className=" bg-[#1a222d] backdrop-blur-md border border-white/8 rounded-2xl p-3 text-xs">
                <p className="text-white/60 mb-1">{label}</p>
                {payload.map((p) => (
                    <p key={p.dataKey} className="text-cyan-400 font-medium">
                        {p.value} {p.name}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

function DashboardBloodReport() {

    const [bloodData, setBloodData] = useState(BloodComponents);
    const [userBloodDetails, setUserBloodDetails] = useState(InitialBloodData);
    const [loggedInUser, setLoggedInUser] = useState({})
    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(true)
    const [countNormal, setCountNormal] = useState(0);
    const [countWarning, setCountWarning] = useState(0);
    const [countCritical, setCountCritical] = useState(0);
    const [editing, setEditing] = useState(null);


    useEffect(() => {

        async function checkLoggedIn() {

            try {

                const response = await axios.get(
                    `${BACKEND_URL}/api/user/getme`,
                    {
                        withCredentials: true,
                    }
                );

                if (response.data.success) {

                    const user = response.data.user;
                    setLoggedInUser(user)
                    setUserBloodDetails(user.bloodRecords)
                    setLoading(false)

                }
            } catch (error) {
                console.log(error);
            }
        }
        checkLoggedIn();
    }, []);
        useEffect(() => {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 3000);
    
            return () => clearTimeout(timer);
        }, []);

    useEffect(() => {

        if (!userBloodDetails?.length) return;

        const report = userBloodDetails[0];

        const updatedBloodData = bloodData.map((item) => {
            for (const key in report) {
                if (item.name === key) {
                    return {
                        ...item,
                        value: report[key]
                    };
                }
            }

            return item;
        });

        setBloodData(updatedBloodData);
        setLoading(false)

    }, [userBloodDetails])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            for (const blood of bloodData) {

                await axios.post(
                    `${BACKEND_URL}/api/medical/updateblood`,
                    {
                        userId: loggedInUser._id,
                        name: blood.name,
                        value: blood.value
                    },
                    {
                        withCredentials: true
                    }
                );
            }

            alert("✅ Blood report updated successfully.");
            setShowForm(false);

        } catch (error) {
            console.log(error);
            alert("Failed to update blood report.");
        }
    };

    useEffect(() => {
        let normalCount = 0;
        let warningCount = 0;
        bloodData.forEach((item) => {
            if (item.value >= item.min && item.value <= item.max) {
                normalCount++;
            } else {
                warningCount++;
            }
        });

        setCountNormal(normalCount);
        setCountWarning(warningCount);
    }, [bloodData]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center  pb-50  min-h-screen gap-4">
                <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 text-sm">Loading your Blood Data...</p>
            </div>
        )
    } else {
        return (
            <div className="space-y-6">

                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <h1 className=" text-2xl font-bold text-white">Blood Report</h1>
                        <p className="text-white/40 text-sm mt-1">Know all About your Blood</p>
                    </div>
                    <button onClick={() => setShowForm(true)} className=" bg-cyan-500 hover:bg-cyan-400 text-white font-medium px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 text-sm flex items-center gap-2">
                        <Plus className="w-4 h-4" />Update Blood
                    </button>
                </div>

                {showForm && (
                    <div className="fixed  h-full inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className=" bg-[#17202b] backdrop-blur-md border border-white/8 rounded-2xl p-7 w-full max-w-md animate-in">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-white">New Appointment</h2>
                                <button onClick={() => setShowForm(false)} className="text-white/30 hover:text-white"><X className="w-5 h-5" /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {bloodData.map((blood, index) => (
                                        <div key={blood.name}>
                                            <label className="block text-xs text-white/40 mb-1.5">
                                                {blood.name}
                                            </label>

                                            <input
                                                type="number"
                                                name={blood.name}
                                                value={blood.value}
                                                onChange={(e) => {
                                                    const updated = [...bloodData];

                                                    updated[index] = {
                                                        ...updated[index],
                                                        value: e.target.value,
                                                    };

                                                    setBloodData(updated);
                                                }}
                                                className="w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm py-2.5"
                                                required
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="flex-1 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 hover:border-white/20 font-medium px-5 rounded-xl transition-all duration-200 active:scale-95 text-sm py-3"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-white font-medium cursor-pointer px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 text-sm"
                                    >
                                        Update Blood Component
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Summary banner */}
                <div className=" bg-[#1a222d] backdrop-blur-md border border-white/8 rounded-2xl p-5 ">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                            <Droplets className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                            <h2 className="font-ss font-semibold text-white">
                                Blood Analysis Summary
                            </h2>
                            <p className="text-white/40 text-xs">
                                {countNormal} normal · {countWarning} needs attention
                            </p>
                        </div>
                    </div>
                    <div className="flex  gap-4">
                        {[
                            { label: "Normal", count: countNormal, color: "bg-cyan-500" },
                            { label: "Warning", count: countWarning, color: "bg-orange-500" },
                            { label: "Critical", count: countCritical, color: "bg-rose-500" },
                        ].map((s) => (
                            <div key={s.label} className="flex items-center gap-2 text-sm">
                                <div className={clsx("w-2.5 h-2.5 rounded-full", s.color)} />
                                <span className="text-white/50">
                                    {s.count} {s.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Metrics grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {bloodData.map((item) => {
                        const isNormal = item.value >= item.min && item.value <= item.max;

                        return (
                            <div
                                key={item.name}
                                className=" bg-[#1a222d] backdrop-blur-md border border-white/8 rounded-2xl p-4 hover:scale-[1.01] transition-transform"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs text-white/40 font-medium">
                                        {item.name}
                                    </span>
                                    <span
                                        className={` px-2 py-1 rounded-2xl  border ${isNormal ? "border-cyan-500/90 text-cyan-500  bg-cyan-500/5" : "border-orange-500/90 text-orange-500 bg-orange-500/5"}  text-xs`}
                                    >
                                        {isNormal ? "Normal" : "Warning"}
                                    </span>
                                </div>
                                {/* Value of the blood */}
                                <div className="flex items-baseline gap-1.5 mb-2">
                                    <span
                                        className={`${isNormal ? "text-cyan-500/80" : "text-orange-500"} text-2xl font-bold cursor-pointer hover:opacity-80`}
                                    >
                                        {item.value}
                                    </span>


                                    <span className="text-xs text-white/30">{item.unit}</span>
                                </div>
                                <p className="text-xs text-white/25">
                                    Normal: {item.min}-{item.max}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Charts */}
                <div className="">
                    {/* !st chart */}
                    <div className=" bg-[#1a222d] backdrop-blur-md border border-white/8 rounded-2xl p-5 mb-5">
                        <h2 className="text-xl font-semibold text-white mb-4">
                            Blood Parameters
                        </h2>
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={bloodData} barSize={28}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="rgba(255,255,255,0.04)"
                                />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar
                                    dataKey="value"
                                    name="Value"
                                    fill="#259978"
                                    radius={[6, 6, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Note */}
                <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-amber-500/5 border border-amber-500/10 text-sm">
                    <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-white/50">
                        {countNormal} blood components are normal while {countWarning} need your attention,
                        Improve your diet and do Exercise to keep it healthy.
                    </p>
                </div>
            </div>
        );
    }
}

export default DashboardBloodReport;
