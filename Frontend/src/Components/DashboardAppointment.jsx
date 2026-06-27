import { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin, Plus, CheckCircle2, Stethoscope, X, Trash2 } from 'lucide-react'
import axios from 'axios'
import mockAppointments from './assets/Appointments.js'


function AppointmentsPage() {

    const [filter, setFilter] = useState('all')
    const [Appointment, setAppointment] = useState(mockAppointments)
    const [showForm, setShowForm] = useState(false)
    const [newAppointment, setNewAppointment] = useState(mockAppointments)
    const [loading, setLoading] = useState(true)
    const [loggedInUser, setLoggedInUser] = useState({})
    const [form, setForm] = useState({ doctor: '', specialty: '', hospital: '', date: '', time: '', type: '', status: '' })

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
                setAppointment(user.appointments)
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


    const filtered = filter === 'all' ? Appointment : Appointment.filter(a => a.status === filter)

    const addAppointment = async (e) => {
        e.preventDefault()

        setNewAppointment(prev => [
            {
                id: `apt_${Date.now()}`,
                ...form,
                status: 'upcoming'
            },
            ...prev,
        ])

        let currStatus = (Date.now() > new Date(form.date).getTime()) ? "completed" : 'upcoming'
        const { doctor, specialty, hospital, date, time, type } = form
        const userId = loggedInUser._id

        try {
            const response = await axios.post(
                'http://localhost:5000/api/medical/appointment',
                { userId, doctor, specialty, hospital, date, time, type, currStatus },
                {
                    withCredentials: true
                }
            )

            if (response.data.success) {
                alert("✅ " + response.data.message);
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || error.message);
        }

        setShowForm(false)

        setForm({
            doctor: '',
            specialty: '',
            hospital: '',
            date: '',
            time: '',
            type: '',
            status: '',
        })
    }

    const handleAppointmentDelete = async (appointmentId) => {
        try {

            const response = await axios.post(
                "http://localhost:5000/api/medical/deletedappointment",
                { appointmentId },
                {
                    withCredentials: true
                })
            if (response.data.success) {
                alert("✅ " + response.data.message);
                window.location.reload();
            }
        }
        catch (error) {
            console.log(error);
            alert(error.response?.data?.message || error.message);
        }
    }

    const [countUpcoming, setCountUpcoming] = useState(0);
    const [countCompleted, setCountCompleted] = useState(0);

    useEffect(() => {

        let upcomingCount = 0;
        let completedCount = 0;
        Appointment.forEach((item) => {

            if (item.status == "upcoming") {
                upcomingCount++;
            } else {
                completedCount++;
            }

        });

        setCountUpcoming(upcomingCount);
        setCountCompleted(completedCount);

    }, [Appointment]);



    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 text-sm">Loading your Appointments...</p>
            </div>
        )
    } else {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <h1 className=" text-2xl font-bold text-white">Appointments</h1>
                        <p className="text-white/40 text-sm mt-1">{countUpcoming} upcoming visits</p>
                    </div>
                    <button onClick={() => setShowForm(true)} className=" bg-cyan-500 hover:bg-cyan-400 text-white font-medium px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 text-sm flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Book Appointment
                    </button>
                </div>

                {/*form to create an appointment */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className=" bg-[#17202b] backdrop-blur-md border border-white/8 rounded-2xl p-7 w-full max-w-md animate-in">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-white">New Appointment</h2>
                                <button onClick={() => setShowForm(false)} className="text-white/30 hover:text-white"><X className="w-5 h-5" /></button>
                            </div>
                            <form onSubmit={addAppointment} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-white/40 mb-1.5">Doctor Name</label>
                                        <input
                                            value={form.doctor}
                                            name='doctor'
                                            onChange={e => setForm(p => ({
                                                ...p,
                                                doctor: e.target.value
                                            }))}
                                            name='doctor'
                                            className=" w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm py-2.5"
                                            placeholder="Dr. Name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-white/40 mb-1.5">Specialty</label>
                                        <input
                                            value={form.specialty}
                                            name='speciality'
                                            onChange={e => setForm(p => ({ ...p, specialty: e.target.value }))}
                                            className=" w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm py-2.5"
                                            placeholder="Cardiologist"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-white/40 mb-1.5">Hospital / Clinic</label>
                                    <input
                                        value={form.hospital}
                                        name='hospital'
                                        onChange={e => setForm(p => ({ ...p, hospital: e.target.value }))}
                                        className=" w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm "
                                        placeholder="Hospital name"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-white/40 mb-1.5">Date</label>
                                        <input
                                            type="date"
                                            value={form.date}
                                            name='date'
                                            onChange={e => setForm(p => ({ ...p, date: e.target.value }))}

                                            className=" w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-white/40 mb-1.5">Time</label>
                                        <input
                                            type="time"
                                            value={form.time}
                                            name='time'
                                            onChange={e => setForm(p => ({ ...p, time: e.target.value }))}
                                            className=" w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm "
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-white/40 mb-1.5">Visit Type</label>
                                    <input
                                        value={form.type}
                                        name='type'
                                        onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                                        className=" w-full  bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm "
                                        placeholder="e.g. Follow-up, Routine Checkup"
                                        required
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
                                        className="flex-1  bg-cyan-500 hover:bg-cyan-400 text-white font-medium cursor-pointer px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 text-sm">Book Appointment
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Filter tabs */}
                <div className="flex gap-2">
                    {['all', 'upcoming', 'completed'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`
                            px-4 py-2 cursor-pointer rounded-xl text-sm font-medium capitalize border transition-all 
                           ${(filter === f) ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-400" : "bg-white/5 border-white/10 text-white/40 hover:text-white"} `}
                        >{f === 'all' ? `All (${Appointment.length})` : f}</button>
                    ))}
                </div>

                {/* Timeline */}
                <div className="space-y-3">
                    {filtered.map(apt => {
                        return (
                            <div key={apt._id || apt.id} className=' bg-[#1a222d]        backdrop-blur-md border-white/8 rounded-2xl p-5 border hover:border-white/15 transition-all'>
                                <div className="flex items-start gap-4 flex-wrap">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-amber-500/10  shrink-0 ${(apt.status == "upcoming") ? " bg-amber-500/10  " : " bg-cyan-500/10 "}`}>
                                        <Stethoscope className={` w-5 h-5 ${(apt.status == "upcoming") ? " text-amber-500  " : " text-cyan-500 "}  `} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <h3 className="font-medium text-white">{apt.doctor}</h3>
                                                <p className="text-sm text-white/40">{apt.specialty}</p>
                                            </div>
                                            <span className={` inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium   shrink-0 ${(apt.status == "upcoming") ? "bg-amber-500/10 border border-amber-500/80 text-amber-500/90" : "bg-cyan-500/10 border border-cyan-500/80 text-cyan-500/90"}  `}>
                                                {apt.status === 'completed' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3 " />}
                                                {apt.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center flex-wrap gap-4 mt-3 text-xs text-white/30">
                                            <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" />{apt.date}</span>
                                            <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{apt.time}</span>
                                            <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" />{apt.hospital}</span>
                                        </div>

                                        <div className='flex justify-between'>
                                            {apt.type && <div className="mt-2"><span className=" inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium  bg-white/5 text-white/30">{apt.type}</span></div>}

                                            <button onClick={() => handleAppointmentDelete(apt._id)} className="px-3 py-2 text-xs text-white/30 cursor-pointer hover:bg-red-500/8 hover:text-red-500/60 bg-white/3 hover:bg-accent-rose/10 rounded-lg transition-all">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {
                    filtered.length === 0 && (
                        <div className="text-center py-16 text-white/20">
                            <Calendar className="w-10 h-10 mx-auto mb-3" />
                            <p>No appointments found</p>
                        </div>
                    )
                }
            </div >
        )
    }
}

export default AppointmentsPage