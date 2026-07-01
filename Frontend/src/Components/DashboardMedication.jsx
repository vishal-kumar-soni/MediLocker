import { useState, useEffect } from 'react'
import { Pill, Clock, Plus, CheckCircle2, Calendar, X, ToggleLeft, Trash2, ToggleRight } from 'lucide-react'
import clsx from 'clsx'
import mockMedications from './assets/Medications.js'
import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const timeColors = {
    Morning: 'text-amber-500 bg-amber-500/10',
    Night: 'text-violet-500 bg-violet-500/10',
    Sunday: 'text-cyan-500 bg-cyan-500/10',
    Afternoon: 'text-emerald-500 bg-emerald-500/10',
}


function DashboardMedication() {

    const [meds, setMeds] = useState(mockMedications)
    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(true)
    const [loggedInUser, setLoggedInUser] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [form, setForm] = useState({ name: '', dose: '', time: '', PrescribedFor: '', startDate: '' })
    const [todayChecked, setTodayChecked] = useState({})

    const toggleToday = (_id) => {
        setTodayChecked(prev => ({ ...prev, [_id]: !prev[_id] }))
    }

    useEffect(() => {
        async function checkLoggedIn() {
            const response = await axios.get(
                ` ${BACKEND_URL}/api/user/getme`,
                {
                    withCredentials: true
                })

            if (response.data.success) {
                const user = response.data.user;
                setLoading(false)
                setLoggedInUser(user);
                setIsLoggedIn(true)
                setMeds(user.medications)
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


    const addMed = async (e) => {
        e.preventDefault()
        setMeds(prev => [
            {
                id: `med_${Date.now()}`,
                ...form,
                active: true
            },
            ...prev
        ])


        const { name, dose, time, PrescribedFor, startDate } = form
        const userId = loggedInUser._id

        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/medical/medication`,
                { userId, name, dose, time, PrescribedFor, startDate },
                {
                    withCredentials: true
                }
            )

            if (response.data.success) {
                alert(response.data.message);
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || error.message);
        }

        setShowForm(false)
        setForm({ name: '', dose: '', time: '', PrescribedFor: '', startDate: '' })
    }

    const handleMedicationDelete = async (medicationId) => {

        console.log(medicationId)
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/medical/deletemedication`,
                { medicationId },
                {
                    withCredentials: true
                })
            if (response.data.success) {
                alert(response.data.message);
                window.location.reload();
            }
        }
        catch (error) {
            console.log(error);
            alert(error.response?.data?.message || error.message);
        }
    }

    const totalMeds = meds.length

    if (loading) {
        return (
            <div className="flex flex-col items-center  pb-50  justify-center min-h-screen gap-4">
                <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 text-sm">Loading your Medications...</p>
            </div>
        )
    } else {
        return (
            <div className="space-y-5 ">
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <h1 className=" text-2xl font-bold text-white">Medications</h1>
                        <p className="text-white/40 text-sm mt-1">{totalMeds} active Medications</p>
                    </div>
                    <button onClick={() => setShowForm(true)} className=" bg-cyan-500 hover:bg-cyan-400 text-white font-medium px-5 py-2.5 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 text-sm flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Add Medication
                    </button>
                </div>

                {/* Modal */}
                {showForm && (
                    <div className="fixed  h-full inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className=" bg-[#151e29] backdrop-blur-md border border-white/8 rounded-2xl  hover:border-cyan-500/30 transition-all duration-300 hover:glow-teal-sm cursor-default p-7 w-full max-w-md animate-in">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-white">Add Medication</h2>
                                <button onClick={() => setShowForm(false)} className="text-white/30 hover:text-white"><X className="w-5 h-5" /></button>
                            </div>
                            <form onSubmit={addMed} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-white/40 mb-1.5">Medication Name</label>
                                        <input
                                            value={form.name}
                                            name='name'
                                            onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm"
                                            placeholder="Amlodipine"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-white/40 mb-1.5">Dosage</label>
                                        <input
                                            value={form.dose}
                                            name='dose'
                                            onChange={e => setForm(p => ({ ...p, dose: e.target.value }))} className="w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm "
                                            placeholder="5mg"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs text-white/40 mb-1.5">Prescribed For</label>
                                    <input
                                        value={form.PrescribedFor}
                                        name='Prescribed'
                                        onChange={e => setForm(p => ({ ...p, PrescribedFor: e.target.value }))}
                                        className="w-full bg-[#192638]  border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm "
                                        placeholder="Hypertension"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs text-white/40 mb-1.5">Time</label>
                                    <input
                                        value={form.time}
                                        name='time'
                                        onChange={e => setForm(p => ({ ...p, time: e.target.value }))}
                                        className="w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm "
                                        placeholder="Morning"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs text-white/40 mb-1.5">Start Date</label>
                                    <input
                                        type="date"
                                        name='startDate'
                                        value={form.startDate}
                                        onChange={e => setForm(p => ({ ...p, startDate: e.target.value }))} className="w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 
                                    focus:ring-cyan-500/20 text-sm "
                                    />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="flex-1  bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 hover:border-white/20 font-medium px-5  rounded-xl transition-all duration-200 active:scale-95 text-sm py-3">Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="flex-1  bg-cyan-500 hover:bg-cyan-400 text-white font-medium px-5 cursor-pointer rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 text-sm py-3">Add Medication
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Today's doses */}
                <div className=" hover:border-cyan-500/30 transition-all duration-300 hover:glow-teal-sm cursor-default px-5 py-4">
                    <h2 className="text-xl font-semibold text-white mb-4">Today's Doses</h2>
                    <div className="space-y-2">
                        {meds.map(med => (
                            <div key={med._id || med.id} className={` p-3.5 rounded-xl border transition-all' ${(todayChecked[med._id]) ? "bg-cyan-500/5 border-cyan-500/20" : "bg-white/3 border-white/5"}`}>
                                <div className={`flex items-center gap-4`}>
                                    <button
                                        onClick={isLoggedIn ?() => toggleToday(med._id):undefined}
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0' ${todayChecked[med._id] ? "border-cyan-500 bg-cyan-500" : "border-white/20 hover:border-cyan-500"}`}>
                                        {todayChecked[med._id] && <CheckCircle2 className="w-4 h-4 text-white" />}
                                    </button>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-medium transition-all capitalize ${todayChecked[med._id] ? 'text-white/40 line-through' : "text-white "} `}>
                                            {med.name} · {med.dose}
                                        </p>
                                        <p className="text-xs text-white/50 mt-2">Start From - {med.startDate}</p>
                                    </div>
                                    <span className=' inline-flex items-center gap-1.5  py-1 rounded-full text-xs font-medium  px-2.5 text-cyan-500 bg-cyan-500/10'>
                                        <Clock className="w-3 h-3" />{med.time}
                                    </span>
                                </div>

                                <div className='flex justify-between'>
                                    <p className='text-gray-500 text-[12px] pt-1 sm:text-[13px]  font-semibold pl-10'> For - {med.PrescribedFor}</p>

                                    <button onClick={() => handleMedicationDelete(med._id)} className="px-3 py-2 text-xs text-white/30 cursor-pointer hover:bg-red-500/8 hover:text-red-500/60 bg-white/3 hover:bg-accent-rose/10 rounded-lg transition-all">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/5 text-xs text-cyan-500 font-bold text-right">
                        {Object.values(todayChecked).filter(Boolean).length} / {totalMeds} taken today
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardMedication
