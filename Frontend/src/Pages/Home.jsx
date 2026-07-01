import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/Logo.png'
import {
    Plus, Lock, CheckCircle2, ChevronRight, Star, ShieldCheck, Globe2, FileText, UserPlus, PlayCircle, Building2, Users, Camera,
} from 'lucide-react'
import Footer from '../Components/Footer.jsx'
import features from '../Components/assets/features.js'
import heroPhoto from '../Components/assets/hero-2.png'
import axios from 'axios'
import profileImage from '../Components/assets/profile.jpg'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const trustPoints = [
    { icon: ShieldCheck, label: "100% Secure\n& Private" },
    { icon: Globe2, label: "Access\nAnywhere" },
    { icon: FileText, label: "Paperless\nHealthcare" },
];

const stats = [
    { icon: Users, value: "10K+", label: "Happy Patients" },
    { icon: Building2, value: "50+", label: "Partner Hospitals" },
    { icon: ShieldCheck, value: "99.9%", label: "System Uptime" },
    { icon: Lock, value: "0", label: "Data Breaches" },
];


function Home() {
    const navigate = useNavigate()

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState({})

    useEffect(() => {
        async function checkLoggedIn() {
            const response = await axios.get(
                `${BACKEND_URL}/api/user/getme`,
                {
                    withCredentials: true
                })

            if (response.data.success) {
                const user = response.data.user;
                setLoggedInUser(user);
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        }

        checkLoggedIn();

    }, []);

    const handleLogOut = async () => {
        try {
            await axios.post(
                `${BACKEND_URL}/api/user/logout`,
                {},
                {
                    withCredentials: true,
                }
            );

            navigate('/login')
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-[#0d1117] overflow-x-hidden">

            {/* Navbar */}
            <nav className="relative z-10  flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <img src={logo} alt="logo" className='w-[90%] h-[90%] ' />
                    </div>
                    <span className="font-logo text-xl font-bold text-white">
                        Medi<span className="text-cyan-300">Locker</span>
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    {isLoggedIn ? (

                        <Link to="/login"
                            onClick={handleLogOut}

                            className=" bg-red-600 hover:bg-red-500 text-white font-medium px-3 py-1.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-red-500/20 active:scale-95 text-sm sm:px-5 sm:py-2.5">Logout
                        </Link>
                    ) : (
                        <Link to="/login"
                            onClick={()=>window.scrollTo(0, 0)}

                            className=" bg-cyan-500 hover:bg-cyan-400 text-white font-medium px-3 py-1.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 text-sm sm:px-5 sm:py-2.5">Login
                        </Link>
                    )}

                    <Link to="/body_organs" className="hidden sm:block bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 hover:border-white/20 font-medium px-3 py-1.5 rounded-xl transition-all duration-200 active:scale-95 text-sm sm:px-5 sm:py-2.5">Human Organs</Link>

                    <div className="w-9 h-9 rounded-full    flex items-center justify-center text-sm font-bold text-white">
                        <Link to={isLoggedIn?'/dashboard/profile':'/login'}>
                            <img src={loggedInUser.profileImage ? loggedInUser.profileImage : profileImage} alt="profile Image" className='rounded-full' />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <main className=" relative overflow-hidden">
                {/* ambient glow accents */}
                <div className="pointer-events-none absolute -top-40 left-1/3 h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[120px]" />
                <div className="pointer-events-none absolute top-40 right-0 h-[420px] w-[420px] rounded-full bg-indigo-500/10 blur-[120px]" />

                <section className="relative mx-auto max-w-7xl px-6 pt-8 pb-16 lg:px-10 lg:pt-12">
                    <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:gap-10">

                        {/* Left column */}
                        <div className="relative z-10 md:pl-20 ">

                            <h1 className="mt-6 text-5xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl">
                                One Platform for
                                <br />
                                All Your
                                <br />
                                <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-500 bg-clip-text text-transparent">
                                    Medical Records
                                </span>
                            </h1>

                            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
                               Securely manage all your medical reports, prescriptions, and health records in one place. Access your information anytime, anywhere with complete privacy and protection.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
                                {trustPoints.map(({ icon: Icon, label }) => (
                                    <div key={label} className="flex items-center gap-3">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-800/60 text-cyan-300">
                                            <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                                        </span>
                                        <span className="whitespace-pre-line text-sm leading-tight text-slate-300">
                                            {label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-9 flex flex-wrap gap-4">
                                <Link to={ isLoggedIn? '/dashboard':'/register'} className="inline-flex items-center gap-2 rounded-xl  bg-cyan-400  px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition-transform hover:scale-[1.02] active:scale-[0.99]">
                                  {isLoggedIn?<ChevronRight className="h-5 w-5" />:<UserPlus className="h-5 w-5" />}  
                                   {isLoggedIn?'Your Dashboard':'Create Free Account'} 
                                </Link>
                                <Link to='/dashboard' className={` ${!isLoggedIn? 'inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/40 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-slate-800/60':'hidden'} `}>
                                    <PlayCircle className="h-5 w-5" />
                                    Demo Login
                                </Link>
                            </div>
                        </div>

                        {/* Right column - hero visual */}
                        <div className="relative z-10 lg:mt-2 px-4">
                            <div className="relative rounded-[28px] border border-slate-700/60 bg-slate-900/40 p-3 shadow-2xl shadow-black/40 backdrop-blur-sm">
                                <div className="relative overflow-hidden rounded-2xl">
                                    <img
                                        src={heroPhoto}
                                        alt="Patients reviewing medical records with doctors on MediLocker"
                                        className="h-[360px] w-full object-cover sm:h-[320px] lg:h-[380px]"
                                    />
                                </div>

                                {/* Info bar under image */}
                                <div className="mt-3 flex flex-col gap-4 rounded-2xl border border-white/5 bg-slate-950/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                            <img src={logo} alt="logo" className='w-[90%] h-[90%] ' />
                                        </div>
                                        <span className="font-logo font-bold text-white">
                                            Medi<span className="text-cyan-300">Locker</span>
                                        </span>
                                    </div>

                                    <p className="text-sm leading-snug text-slate-300">
                                        Tension-free care for your medical reports — anytime,
                                        anywhere{" "}
                                        <span className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-300">
                                            <Camera className="h-3 w-3" />
                                            News &amp; Updates
                                        </span>
                                    </p>

                                    <Link
                                        to="/login"
                                        aria-label="Next"
                                        className="flex  h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-800 text-white transition-colors hover:bg-slate-700"
                                    >
                                        <ChevronRight className="h-4.5 w-4.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats bar */}
                    <div className="relative z-10 mt-16 grid grid-cols-2 gap-8 rounded-2xl border border-slate-800  transition-all duration-300 bg-slate-800/40 px-5 py-5 sm:grid-cols-4 hover:border-cyan-500/40 sm:gap-6">
                        {stats.map(({ icon: Icon, value, label }) => (
                            <div key={label} className="flex bg-slate-900/70 items-center gap-4 border border-white/10 p-5 rounded-2xl ">
                                <span className="flex h-12 w-12  shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-900/60 text-sky-400">
                                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                                </span>
                                <div className="leading-tight">
                                    <p className="text-md sm:text-2xl font-extrabold text-white">{value}</p>
                                    <p className="text-sm text-slate-400">{label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Features */}
            <section className="relative z-10 px-6 md:px-12 pb-24">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className=" text-3xl md:text-4xl font-bold text-white mb-4">
                            Everything Your Health Needs
                        </h2>
                        <p className="text-white/40 max-w-xl mx-auto">
                            A complete platform built for patients to take control of their medical journey.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {features.map((f, i) => (
                            <div key={i} className="bg-[#151c29] backdrop-blur-md border border-white/8 rounded-2xl p-7  hover:border-cyan-500/40 transition-all duration-300">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} p-0.5 mb-5`}>
                                    <div className="w-full h-full bg-surface-800 rounded-[10px] flex items-center justify-center">
                                        <f.icon className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <h3 className=" text-xl font-semibold text-white mb-2">{f.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What you can store */}
            <section className="relative  z-10 px-6 md:px-12 pb-24">
                <div className="max-w-4xl mx-auto bg-[#151c29]    backdrop-blur-md border border-white/8 rounded-2xl p-10 text-center">
                    <h2 className=" text-2xl font-bold text-white mb-8">What You Can Store</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {['Blood Reports', 'X-Rays & MRI', 'Prescriptions', 'Organ Health Data', 'ECG / Echo', 'Vaccination Records', 'Dental Records', 'Eye Tests', 'Allergies & Conditions'].map(item => (
                            <div key={item} className="flex items-center gap-2.5 text-left text-sm text-white/70">
                                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                                {item}
                            </div>
                        ))}
                    </div>
                    <div className="mt-10">
                        <Link to="/register" className=" inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-medium px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 text-sm">
                            Start Organizing Your Records
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer  */}
            <Footer />
        </div>
    )
}

export default Home
