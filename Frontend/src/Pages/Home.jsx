import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../assets/Logo.jpg'
import { Shield, Upload, Share2, Activity, Lock, ArrowRight, CheckCircle2, Zap, Heart, ChevronRight } from 'lucide-react'
import Footer from '../Components/Footer.jsx'

const features = [
    { icon: Upload, title: 'Smart Document Upload', desc: 'Upload prescriptions, lab reports, X-rays — all organized automatically by date and type.', color: 'from-primary-500 to-accent-teal' },
    { icon: Activity, title: 'Health Vitals Tracking', desc: 'Monitor blood pressure, sugar levels, weight, and heart rate over time with beautiful charts.', color: 'from-accent-cyan to-accent-violet' },
    { icon: Share2, title: 'Instant Doctor Sharing', desc: 'Generate a secure QR code or shareable link so any doctor can access your records instantly.', color: 'from-accent-violet to-accent-rose' },
    { icon: Shield, title: 'Military-Grade Security', desc: 'Your data is encrypted end-to-end. Only you control who sees your medical information.', color: 'from-accent-amber to-accent-emerald' },
]

const stats = [
    { value: '50K+', label: 'Patients' },
    { value: '200+', label: 'Hospitals' },
    { value: '99.9%', label: 'Uptime' },
    { value: '0', label: 'Data Breaches' },
]

function Home() {

    return (
        <div className="min-h-screen bg-[#0d1117] overflow-x-hidden">

            {/* Navbar */}
            <nav className="relative z-10  flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <img src={logo} alt="logo" className='w-[90%] h-[90%] ' />
                    </div>
                    <span className="font-logo text-xl font-bold text-white">MediLocker</span>
                </div>
                <div className="flex items-center gap-3">
                    <Link to="/login" className=" bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 hover:border-white/20 font-medium px-3 py-1.5 rounded-xl transition-all duration-200 active:scale-95; text-sm sm:px-5 sm:py-2.5">Sign in</Link>

                    <Link to="/body_organs" className=" bg-emerald-500 hover:bg-primary-400 text-white font-medium px-3 py-1.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/20 active:scale-95text-sm sm:px-5 sm:py-2.5">Human Organs</Link>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative z-10 text-center px-6 pt-16 pb-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
                    <Zap className="w-3.5 h-3.5" />
                    Your complete health record, always accessible
                </div>
                <h1 className="font-title text-5xl md:text-7xl font-bold text-white leading-tight mb-6 max-w-4xl mx-auto">
                    Your Health Data,{' '}
                    <span className=" bg-gradient-to-r from-emerald-300 to-cyan-500 bg-clip-text text-transparent">One Secure Vault</span>
                </h1>
                <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                    Store all your medical records, track health vitals, and share instantly with any doctor — no more carrying physical files or repeating your history at every visit.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/register" className="bg-emerald-500 flex items-center gap-2 bg-primary-500 hover:bg-primary-400 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-primary-500/25">
                        Create Free Account
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/login" className="flex items-center gap-2 text-white/60 hover:text-white font-medium px-7 py-3.5 transition-colors">
                        <Lock className="w-4 h-4" />
                        Demo Login
                    </Link>
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap  justify-center gap-8 mt-16 pt-16 border-t border-white/5">
                    {stats.map(s => (
                        <div key={s.label} className="text-center">
                            <div className="bg-gradient-to-r from-emerald-300 to-cyan-500 bg-clip-text text-transparent font-numberText text-3xl font-bold gradient-text">{s.value}</div>
                            <div className="text-white/40 text-sm mt-1">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="relative z-10 px-6 md:px-12 pb-24">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                            Everything Your Health Needs
                        </h2>
                        <p className="text-white/40 max-w-xl mx-auto">
                            A complete platform built for patients to take control of their medical journey.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {features.map((f, i) => (
                            <div key={i} className="bg-[#151c29] backdrop-blur-md border border-white/8 rounded-2xl p-7  hover:border-primary-500/20 transition-all duration-300">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} p-0.5 mb-5`}>
                                    <div className="w-full h-full bg-surface-800 rounded-[10px] flex items-center justify-center">
                                        <f.icon className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <h3 className="font-display text-lg font-semibold text-white mb-2">{f.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What you can store */}
            <section className="relative  z-10 px-6 md:px-12 pb-24">
                <div className="max-w-4xl mx-auto bg-[#151c29]    backdrop-blur-md border border-white/8 rounded-2xl p-10 text-center">
                    <h2 className="font-display text-2xl font-bold text-white mb-8">What You Can Store</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {['Blood Reports', 'X-Rays & MRI', 'Prescriptions', 'Organ Health Data', 'ECG / Echo', 'Vaccination Records', 'Dental Records', 'Eye Tests', 'Allergies & Conditions'].map(item => (
                            <div key={item} className="flex items-center gap-2.5 text-left text-sm text-white/70">
                                <CheckCircle2 className="w-4 h-4 text-primary-400 shrink-0" />
                                {item}
                            </div>
                        ))}
                    </div>
                    <div className="mt-10">
                        <Link to="/register" className="group inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-medium px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/20 active:scale-95 text-sm">
                            Start Organizing Your Records
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            {/* <footer className="relative z-10 border-t border-white/5 py-8 px-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                    <Heart className="w-4 h-4 text-emerald-500" />
                    <span className="font-display font-bold text-white">MediVault</span>
                </div>
                <p className="text-white/30 text-xs">Final Year Project · Built with React + Vite + Tailwind CSS</p>
            </footer> */}
            
            <Footer/>

        </div>
    )
}

export default Home
