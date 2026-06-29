import { Activity, CheckCircle2, AlertTriangle, Clock, Plus, CircleCheck, } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bodyImage from "../assets/body.png";
import MockorganHealth from "./assets/organHealth";
import axios from "axios";


function DashboardOrganHealth() {
    const [countHealthy, setCountHealthy] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loggedInUser, setLoggedInUser] = useState({});
    const [countAttention, setCountAttention] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [OrganHealth, setOrganHealth] = useState([])
    const [formData, setFormData] = useState(
        MockorganHealth.map((organ) => ({
            name: organ.name,
            image: organ.image,
            status: "Healthy",
            note: "",
            lastCheck: "",
        })),
    );
    
    useEffect(() => {
        async function checkLoggedIn() {
            const response = await axios.get(
                'http://localhost:5000/api/user/getme',
                {
                    withCredentials: true
                })

            if (response.data.success) {
                const user = response.data.user;
                setLoading(false)
                setLoggedInUser(user);
                setOrganHealth(user.organHealthRecords)
            }
        }
        
        checkLoggedIn();
    }, []);
    
    console.log("Form data",formData)
    console.log("Organ Health--",OrganHealth)

    // OrganHealth.map((organ)=>{
    //     MockorganHealth.map((mock)=>{
    //         if(organ.name==mock.name){
                
    //             organ.image = mock.image
    //         }
    //     })
    // })

    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault()

        // axios.post("/api/organ-health", {
        //   organs: formData
        // })

        setShowForm(false);
    };

    useEffect(() => {
        let HealthyCount = 0;
        let AttentionCount = 0;
        formData.forEach((item) => {
            if (item.status == "Healthy") {
                HealthyCount++;
            } else {
                AttentionCount++;
            }
        });

        setCountHealthy(HealthyCount);
        setCountAttention(AttentionCount);
    }, [formData]);

    if (loading) {
        return (
            <div className="flex flex-col  pb-50  items-center justify-center min-h-screen gap-4">
                <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 text-sm">Loading your Organ Health...</p>
            </div>
        )
    } else {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Organ Health</h1>
                        <p className="text-white/40 text-sm mt-1">
                            Track the health status of each organ system
                        </p>
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-cyan-500 hover:bg-cyan-400 text-white font-medium px-5 py-2.5 rounded-xl transition-all cursor-pointer duration-200 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 text-sm flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Health Data
                    </button>
                </div>

                {showForm && (
                    <div className="fixed inset-0 bg-black/60  backdrop-blur-sm  flex items-center justify-center z-50">
                        <div className="bg-[#1a222d] w-full max-w-xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-white">
                                    Add Organ Health Data
                                </h2>

                                <button
                                    onClick={() => setShowForm(false)}
                                    className="text-white/60 hover:text-white"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-6">
                                {formData.map((organ, index) => (
                                    <div
                                        key={organ.name}
                                        className="border bg-[#151e29]  border-white/10 rounded-xl p-4"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <img
                                                src={organ.image}
                                                alt={organ.name}
                                                className="w-12 h-12"
                                            />

                                            <h3 className="text-lg font-semibold text-white">
                                                {organ.name}
                                            </h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[14px] text-white/40 mb-1.5">Status</label>
                                                <select
                                                    value={organ.status}
                                                    onChange={(e) => {
                                                        const updated = [...formData];
                                                        updated[index].status = e.target.value;
                                                        setFormData(updated);
                                                    }}
                                                    className="w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white  placeholder:text-white/30 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm"
                                                >
                                                    <option value="Healthy">Healthy</option>
                                                    <option value="Need Attention">Need Attention</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-[14px] text-white/40 mb-1.5">Dosage</label>
                                                <input
                                                    type="date"
                                                    value={organ.lastCheck}
                                                    onChange={(e) => {
                                                        const updated = [...formData];
                                                        updated[index].lastCheck = e.target.value;
                                                        setFormData(updated);
                                                    }}
                                                    className="w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-5">
                                            <label className="block text-[14px] text-white/40 mb-1.5">Note</label>
                                            <textarea
                                                placeholder="Enter note..."
                                                value={organ.note}
                                                onChange={(e) => {
                                                    const updated = [...formData];
                                                    updated[index].note = e.target.value;
                                                    setFormData(updated);
                                                }}
                                                className="w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm"
                                                rows={3}
                                            />

                                        </div>
                                    </div>
                                ))}

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="flex-1  bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 hover:border-white/20 font-medium px-5  rounded-xl transition-all duration-200 active:scale-95 text-sm py-3">Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="flex-1  bg-cyan-500 hover:bg-cyan-400 text-white font-medium px-5 cursor-pointer rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 text-sm py-3">Save Organ Health Data
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                {/* Summary */}
                <div className="grid grid-cols-3 gap-4">
                    {[
                        {
                            label: "Healthy",
                            count: countHealthy,
                            color: "text-cyan-400",
                            bg: "bg-cyan-500/10",
                        },
                        {
                            label: "Attention",
                            count: countAttention,
                            color: "text-amber-500",
                            bg: "bg-amber-500/10",
                        },
                        {
                            label: "Critical",
                            count: 0,
                            color: "text-red-500",
                            bg: "bg-red-500/10",
                        },
                    ].map((s) => (
                        <div
                            key={s.label}
                            className=" bg-[#1a222d]  backdrop-blur-md border border-white/8 rounded-2xl p-4 text-center"
                        >
                            <div
                                className={`${s.bg} w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center  `}
                            >
                                <Activity className={`${s.color} w-5 h-5 `} />
                            </div>
                            <div className={`${s.color} text-2xl font-bold `}>{s.count}</div>
                            <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Organ cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {formData.map((organ) => {
                        const isHealthy = organ.status == "Healthy" ? true : false;

                        return (
                            <div
                                key={organ.name}
                                className=" bg-[#1b2a2f] backdrop-blur-md  border-white/8 rounded-2xl p-5 border hover:scale-[1.01] transition-all duration-200 "
                            >
                                {/* Gradient bg based on organ color */}
                                <div />
                                <div className="relative">
                                    <div className="flex items-start justify-between mb-4 ">
                                        <div className=" h-12 w-12 ">
                                            <img src={organ.image} alt="organ-image" />
                                        </div>

                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${isHealthy ? "border-cyan-500/90 text-cyan-500  bg-cyan-500/5" : "border-orange-500/90 text-orange-500 bg-orange-500/5"}  text-xs`}
                                        >
                                            <CircleCheck className="w-3 h-3" />
                                            {organ.status}
                                        </span>
                                    </div>
                                    <h3 className=" text-lg font-semibold text-white mb-1">
                                        {organ.name}
                                    </h3>
                                    <p className="text-sm text-white/40 leading-relaxed mb-4">
                                        {organ.note}
                                    </p>
                                    <div className="flex items-center gap-1.5 text-xs text-white/30">
                                        <Clock className="w-3 h-3" />
                                        Last check: {organ.lastCheck}
                                    </div>

                                    {/* Status bar */}
                                    <div className="mt-4 h-1 rounded-full bg-white/5">
                                        <div
                                            className={`h-full rounded-full', ${organ.status === "Healthy" ? "bg-cyan-500" : "bg-amber-500"}`}
                                            style={{
                                                width: organ.status === "Healthy" ? "90%" : "55%",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Body diagram placeholder */}
                <div className=" bg-[#1b2a2f] backdrop-blur-md border border-white/8 rounded-2xl p-8 text-center">
                    <div className="text-6xl  flex items-center justify-center mb-4">
                        <img src={bodyImage} alt="" />
                    </div>
                    <h2 className=" text-lg font-semibold text-white mb-2">
                        Know about Human Body Organs
                    </h2>
                    <p className="text-white/30 text-sm max-w-sm mx-auto mb-5">
                        Learn about important human body organs and understand their functions
                        in maintaining a healthy life.
                    </p>
                    <Link
                        to="/body_organs"
                        className=" bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 hover:border-white/20 font-medium px-5 py-2.5 rounded-xl transition-all duration-200 active:scale-95 text-sm mt-4"
                    >
                        Explore
                    </Link>
                </div>
            </div>
        );
    }
}

export default DashboardOrganHealth;
