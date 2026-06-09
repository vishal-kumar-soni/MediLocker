import { Droplets, TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from "recharts";
import clsx from "clsx";
import { useState, useEffect } from "react";
import BloodComponents from "./assets/BloodComponents";

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

    const [countNormal, setCountNormal] = useState(0);
    const [countWarning, setCountWarning] = useState(0);
    const [countCritical, setCountCritical] = useState(0);

    const [editing, setEditing] = useState(null);

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

    return (
        <div className="space-y-6">
            <div>
                <h1 className=" text-2xl font-bold text-white">Blood Report</h1>
                <p className="text-white/40 text-sm mt-1">Know all About your Blood</p>
            </div>

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
                                {editing === item.name ? (
                                    <input
                                        type="number"
                                        value={item.value}
                                        autoFocus
                                        onChange={(e) => {
                                            setBloodData((prev) =>
                                                prev.map((bloodItem) =>
                                                    bloodItem.name === item.name
                                                        ? {
                                                            ...bloodItem,
                                                            value: Number(e.target.value),
                                                        }
                                                        : bloodItem,
                                                ),
                                            );
                                        }}
                                        onBlur={() => setEditing(null)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                setEditing(null);
                                            }
                                        }}
                                        className="w-24 bg-[#111827] border border-cyan-500 rounded-lg px-2 py-1 text-cyan-400 font-bold outline-none"
                                    />
                                ) : (
                                    <span
                                        onClick={() => setEditing(item.name)}
                                        className={`${isNormal ? "text-cyan-500/80" : "text-orange-500"
                                            } text-2xl font-bold cursor-pointer hover:opacity-80`}
                                    >
                                        {item.value}
                                    </span>
                                )}

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
                    Triglycerides are slightly elevated (145 mg/dL , recommended &lt;150
                    mg/dL). Consider reducing saturated fats. Consult your doctor at next
                    visit.
                </p>
            </div>
        </div>
    );
}

export default DashboardBloodReport;
