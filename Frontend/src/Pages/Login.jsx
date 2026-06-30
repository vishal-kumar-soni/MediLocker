import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, Eye, EyeOff, Loader2, X, ChevronLeft } from 'lucide-react'
import logo from '../assets/Logo.png'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'


function LoginPage() {

    const navigate = useNavigate()

    const { token, setToken } = useContext(UserContext)
    const [form, setForm] = useState({ email: '', password: '' })
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const { email, password } = form;

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            setError('')

            const response = await axios.post(
                `http://localhost:5000/api/user/login`,
                { email, password },
                { withCredentials: true }
            );


            if (response.data.success) {

                setToken(response.data.token);
                alert("✅ " + response.data.message);
                navigate('/dashboard')
            }
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || error.message);
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(37,153,120,0.6)_0%,transparent_60%)] pointer-events-none" />

            <div className="relative z-10 w-full max-w-md">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2.5 mb-8">
                        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
                            <img src={logo} alt="logo" className="w-[90%] h-[90%] " />
                        </div>
                        <span className="font-logo text-xl font-bold text-white">
                            Medi<span className="text-cyan-300">Locker</span>
                        </span>
                    </Link>
                    <h1 className="font-separated text-2xl font-bold text-white mb-2">Welcome back</h1>

                    <div className="flex text-white/40 text-sm">
                        <Link to='/' title='Back to Home' className='hover:bg-[#2ec47e] p-0.5 rounded-lg'>
                            <ChevronLeft className="h-5 w-5 text-white" />
                        </Link>
                        <div className='ml-15 sm:ml-22'>
                            Sign in to access your health records
                        </div>
                    </div>

                    <div className="text-white/40 text-sm"></div>
                </div>

                {/* Login Box */}
                <div className="bg-[#151c29] backdrop-blur-md border border-white/8 rounded-2xl p-8">
                    {error && (
                        <div className="flex justify-between mb-5 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
                            {error}
                            <X className='cursor-pointer' onClick={() => setError('')} />
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm text-white/60 mb-2 font-medium">Email</label>
                            <input
                                type="email"
                                value={form.email}
                                name='email'
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full bg-[#1b2335] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-white/60 mb-2 font-medium">Password</label>
                            <div className="relative">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    name='password'
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full bg-[#1b2335] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 pr-11"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(p => !p)}
                                    className="absolute cursor-pointer right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                                >
                                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full  bg-cyan-500 hover:bg-cyan-400 text-white font-medium px-5  rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 flex items-center justify-center gap-2 py-3 mt-8 cursor-pointer"
                        >
                            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</> : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-5 text-center text-sm">
                        <span className="text-white/40">Don't have an account? </span>
                        <Link to="/register" className="text-cyan-400 hover:text-cyan-300 underline font-medium transition-colors">
                            Create one
                        </Link>
                    </div>
                </div>

                <p className="text-center text-xs text-white/20 mt-5">
                    Your Login credentials are safe & sucure
                </p>
            </div>
        </div>
    )
}

export default LoginPage;