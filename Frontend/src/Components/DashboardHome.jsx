import { FileText, Calendar, Pill, Activity, TrendingUp, Clock, ChevronRight, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import appointments from './assets/Appointments'
import features from './assets/features'
import statCards from './assets/statCards'
import { useState, useEffect } from 'react'
import axios from 'axios'



function DashboardHome() {

    const [loggedInUser, setLoggedInUser] = useState({})
    const [allDocument, setAllDocument] = useState([])
    const [medications, setMedications] = useState([])
    const [appointments, setAppointments] = useState([])


    useEffect(() => {
        async function checkLoggedIn() {
            const response = await axios.get(
                'http://localhost:5000/api/user/getme',
                {
                    withCredentials: true
                })

            if (response.data.success) {
                const user = response.data.user;
                setLoggedInUser(user);
                setAllDocument(response.data.user.documents)
                setMedications(response.data.user.medications)
                setAppointments(response.data.user.appointments)
            }
        }

        checkLoggedIn();
    }, []);

    const firstName = loggedInUser.userName
    const hour = new Date().getHours()
    const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'


    return (
        <div className="space-y-7">

            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-white/40 text-sm mb-1">{greeting} 👋</p>
                    <h1 className="font-ss text-3xl font-bold text-white">{firstName}</h1>
                </div>
                <div className=" bg-[#181f2a] backdrop-blur-md border border-white/8 rounded-2xl px-4 py-2.5 flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-cyan-400" />
                    <span className="text-white/60">Records are <span className="text-cyan-400 font-medium">secure</span></span>
                </div>
            </div>

            {/* Health Score Banner */}
            <div className=" bg-[#141a23] backdrop-blur-md border rounded-2xl p-5  border-cyan-500/20 relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-cyan-500/5" />
                <div className="absolute -right-2 top-4 w-20 h-20 rounded-full bg-accent-teal/5" />
                <div className="relative flex items-center justify-between">
                    <div>
                        <p className="text-white/50 text-sm mb-1">Overall Health Score</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-cyan-500 text-5xl font-bold gradient-text">82</span>
                            <span className="text-white/40 text-lg">/100</span>
                        </div>
                        <p className="text-white/40 text-xs mt-2 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-cyan-400" />
                            +3 points from last month
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="w-20 h-20 rounded-full border-4 border-cyan-500/30 flex items-center justify-center relative">
                            <div
                                className="absolute inset-0 rounded-full border-4 border-cyan-500"
                            />
                            <span className="font-display text-xl font-bold text-cyan-400">{loggedInUser.bloodGroup}</span>
                        </div>
                        <p className="text-white/30 text-xs mt-2">Blood Group</p>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full  bg-cyan-500  rounded-full transition-all duration-1000" style={{ width: `${82}%` }} />
                </div>
            </div>

            {/* Stat cards */}
            <div className="grid  grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/dashboard/documents" className=" bg-[#1a222d] backdrop-blur-md border border-white/8 rounded-2xl p-5  hover:border-white/30 transition-all duration-300  cursor-default">
                    <div className={`bg-pink-500/10 w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
                        <ChevronRight className={`text-pink-500 rounded-2xl p-0 `} />
                    </div>
                    <div className="font-display text-2xl font-bold text-white mb-0.5">{loggedInUser.documents?.length}</div>
                    <div className="text-xs text-white/40 capitalize">documents</div>
                    <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 mt-2 transition-colors" />
                </Link>
                <Link to="/dashboard/medications" className=" bg-[#1a222d] backdrop-blur-md border border-white/8 rounded-2xl p-5  hover:border-white/30 transition-all duration-300  cursor-default">
                    <div className={`bg-violet-500/10 w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
                        <Pill className={`text-violet-500 rounded-2xl p-0 `} />
                    </div>
                    <div className="font-display text-2xl font-bold text-white mb-0.5">{loggedInUser.medications?.length}</div>
                    <div className="text-xs text-white/40 capitalize">medications</div>
                    <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 mt-2 transition-colors" />
                </Link>
                <Link to="/dashboard/appointments" className=" bg-[#1a222d] backdrop-blur-md border border-white/8 rounded-2xl p-5  hover:border-white/30 transition-all duration-300  cursor-default">
                    <div className={`bg-amber-500/10 w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
                        <Calendar className={`text-yellow-600 rounded-2xl p-0 `} />
                    </div>
                    <div className="font-display text-2xl font-bold text-white mb-0.5">{loggedInUser.appointments?.length}</div>
                    <div className="text-xs text-white/40 capitalize">appointments</div>
                    <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 mt-2 transition-colors" />
                </Link>
                <Link to="/dashboard/organs" className=" bg-[#1a222d] backdrop-blur-md border border-white/8 rounded-2xl p-5  hover:border-white/30 transition-all duration-300  cursor-default">
                    <div className={`bg-cyan-500/10 w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
                        <Activity className={`text-cyan-400 rounded-2xl p-0 `} />
                    </div>
                    <div className="font-display text-2xl font-bold text-white mb-0.5">82%</div>
                    <div className="text-xs text-white/40 capitalize">Health Score</div>
                    <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 mt-2 transition-colors" />
                </Link>

            </div>

            {/* Recent docs + medications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* Recent Documents */}
                <div className=" bg-[#1a222d] backdrop-blur-md border border-white/8 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-white">Recent Documents</h2>
                        <Link to="/dashboard/documents" className="text-cyan-400 text-xs hover:text-cyan-300">View all</Link>
                    </div>
                    <div className="space-y-2 ">
                        {allDocument.map(document => (
                            <div key={document._id} className=" bg-white/3 border border-white/5 hover:border-white/30 transition-colors flex items-center gap-3 p-3 rounded-xl hover:bg-white/3 mb-4  cursor-pointer group">
                                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                                    <FileText className="w-4 h-4 text-cyan-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-white truncate">{document.name}</p>
                                    <p className="text-xs text-white/30">{document.createdAt.split("T")[0]} · {document.size}</p>
                                </div>
                                <span className="p-2 rounded-xl bg-white/5 text-white/40 text-xs shrink-0">{document.format}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Active Medications */}
                <div className="bg-[#1a222d] backdrop-blur-md border border-white/8 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-white">Active Medications</h2>
                        <Link to="/dashboard/medications" className="text-cyan-400 text-xs hover:text-cyan-300">View all</Link>
                    </div>
                    <div className="space-y-2">
                        {/* {medications.filter(a => a.id <= 4).map(med => ( */}
                        {medications.map(med => (
                            <div key={med._id} className=" bg-white/3 border border-white/5 hover:border-white/30  mb-4 flex items-center gap-3 p-3 rounded-xl hover:bg-white/3 transition-colors cursor-pointer">
                                <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
                                    <Pill className="w-4 h-4 text-violet-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-white capitalize font-medium mb-1">{med.name} <span className="text-white/90 font-normal">. {med.dose}</span></p>
                                    <p className="text-xs text-white/50">For - {med.PrescribedFor} · {med.time}</p>
                                </div>
                                <span className="p-2 rounded-xl bg-white/5 text-white/40 text-xs shrink-0">Active</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                {/* Upcoming appointments */}
                <div className=" bg-[#1a222d] backdrop-blur-md border border-white/8 rounded-2xl p-5 lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className=" text-xl font-semibold text-white">Upcoming</h2>
                        <Link to="/dashboard/appointments" className="text-cyan-400 text-xs hover:text-cyan-300">View all</Link>
                    </div>
                    <div className="space-y-3">
                        {appointments.map(apt => (
                            <div key={apt._id} className="p-3.5 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                                        <Calendar className="w-4 h-4 text-amber-500" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-white truncate">{apt.doctor}</p>
                                        <p className="text-xs text-white/40">{apt.specialty}</p>
                                        <div className="flex items-center gap-1 mt-1.5 text-xs text-white/30">
                                            <Clock className="w-3 h-3" />
                                            {apt.date.split('T')[0]} · {apt.time}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardHome