import { useState, useEffect } from 'react'
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom'
import logo from '../assets/Logo.png'
import {
    LayoutDashboard, User, FileText, Droplets, Activity, Calendar,
    Pill, Share2, LogOut, Menu, X, Bell, ChevronRight
} from 'lucide-react'
import clsx from 'clsx'
import axios from 'axios'
import profileImage from '../Components/assets/profile.jpg'


const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/dashboard/profile', label: 'My Profile', icon: User },
    { to: '/dashboard/documents', label: 'Documents', icon: FileText },
    { to: '/dashboard/blood-report', label: 'Blood Report', icon: Droplets },
    { to: '/dashboard/organs', label: 'Organ Health', icon: Activity },
    { to: '/dashboard/appointments', label: 'Appointments', icon: Calendar },
    { to: '/dashboard/medications', label: 'Medications', icon: Pill },
]

function Dashboard() {
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [loggedInUser, setLoggedInUser] = useState({})

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
            }
        }

        checkLoggedIn();
    }, []);


    const handleLogout = async () => {
        try {
            await axios.post(
                "http://localhost:5000/api/user/logout",
                {},
                {
                    withCredentials: true,
                }
            );

            navigate('/login')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen bg-[#0d1117] flex">

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 h-full w-64 bg-[#0d1117] border-r border-white/5 z-30 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto
                ${(sidebarOpen) ? 'translate-x-0' : '-translate-x-full'
                } `} style={{ background: '#070c12' }}>
                {/* Logo */}
                <div className="flex items-center justify-between px-5 py-5 border-b border-white/5">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <img src={logo} alt="logo" className="w-[90%] h-[90%] " />
                        </div>
                        <Link to='/' className="font-logo text-xl font-bold text-white">MediLocker</Link>
                    </div>
                    <button className="lg:hidden text-white/40 hover:text-white" onClick={() => setSidebarOpen(false)}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-0.5">
                    {navItems.map((item, i) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) => clsx('flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer font-medium text-sm', isActive && ' text-cyan-400 bg-cyan-500/10 border border-cyan-500/20')}
                        >
                            <item.icon className="w-4.5 h-4.5 " />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* User card */}
                <div className="p-3 border-t border-white/5">
                    <div className=" bg-[#1a222d] backdrop-blur-md border border-white/8 rounded-2xl p-3.5 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full  bg-cyan-500  flex items-center justify-center text-sm font-bold text-white shrink-0">
                            <Link to='/dashboard/profile'>
                                <img src={loggedInUser.profileImage ? loggedInUser.profileImage : profileImage} alt="profile Image" className='rounded-full' />
                            </Link>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">  {loggedInUser.userName ? loggedInUser.userName.split(' ')[0] : "Arjun"}</p>
                            <p className="text-xs text-white/40 truncate">{"B+"} · {"Male"}</p>
                        </div>
                        <button onClick={handleLogout} title="Logout" className="text-white/30 hover:text-rose-400 transition-colors">
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1   flex flex-col min-w-0">
                {/* Top bar */}
                <header className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-white/5 bg-surface-900/80 backdrop-blur-md">
                    <button className="lg:hidden text-white/60 hover:text-white" onClick={() => setSidebarOpen(true)}>
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="flex  items-center gap-3 ml-auto">
                        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all">
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-500 rounded-full" />
                        </button>
                        <div className="w-9 h-9 rounded-full  bg-white  flex items-center justify-center text-sm font-bold text-white">
                            <Link to='/dashboard/profile'>
                                <img src={loggedInUser.profileImage ? loggedInUser.profileImage : profileImage} alt="profile Image" className='rounded-full' />
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-5 md:p-7 overflow-y-auto animate-in">
                    <Outlet />

                </main>
            </div>
        </div>
    )
}

export default Dashboard