import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, Eye, EyeOff, Loader2, WatchIcon, ChevronLeft } from 'lucide-react'
import logo from '../assets/Logo.png'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'
import BloodComponents from '../Components/assets/BloodComponents'
import InitialBloodData from '../Components/assets/InitailComponent'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;



const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

function RegisterPage() {

  const navigate = useNavigate()
  const { token, setToken } = useContext(UserContext)

  const [step, setStep] = useState(1)
  const [showPass, setShowPass] = useState(false)
  const [blood, setBlood] = useState(InitialBloodData)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    userName: '', email: '', password: '', phone: '', dob: '', gender: 'Male', bloodGroup: 'B+',
  })

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

  }

  const handleNext = (e) => {
    e.preventDefault()
    setStep(2)
  }

  const { userName, email, password, dob, phone, gender, bloodGroup } = form

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()

    try {

      const response = await axios.post(
        `${BACKEND_URL}/api/user/signup`,
        { userName, email, password, dob, phone, gender, bloodGroup },
        {
          withCredentials: true
        }
      );

      // Creating Blood Report for newly registered user
      const userId = response.data.user._id
      const { hemoglobin, rbc, wbc, platelets, hematocrit, glucose, cholesterol, triglycerides } = blood
      try {
        const bloodResponse = await axios.post(
          `${BACKEND_URL}/api/medical/bloodReport`,
          { userId, hemoglobin, rbc, wbc, platelets, hematocrit, glucose, cholesterol, triglycerides },
          {
            withCredentials: true
          },
        )
      } catch (error) {
        console.log(error);
        alert(error.bloodResponse?.data?.message || error.message);
      }

      // Creating organ Health for newly registered user
      if (response) {
        try {
          const organResponse = await axios.post(
            `${BACKEND_URL}/api/medical/organHealth`,
            { userId },
            {
              withCredentials: true
            },
          )
        } catch (error) {
          console.log(error);
          alert(error.organResponse?.data?.message || error.message);
        }
      }

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
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4 py-10">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(37,153,120,0.6)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-4 ">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
              <img src={logo} alt="logo" className="w-[90%] h-[90%] " />
            </div>
            <span className="font-logo text-xl font-bold text-white">
              Medi<span className="text-cyan-300">Locker</span>
            </span>
          </Link>
          <h1 className="font-separated text-2xl font-bold text-white mb-2">Create your account</h1>
          <div className="flex text-white/40 text-sm">
            <Link to='/' title='Back to Home' className='hover:bg-[#2ec47e] p-0.5 rounded-lg transition-all'>
              <ChevronLeft className="h-5 w-5 text-white" />
            </Link>
            <div className='ml-25 sm:ml-30'>
              Step {step} of 2 — {step === 1 ? 'Account Info' : 'Health Profile'}
            </div>
          </div> 
        </div>

        <div className="flex gap-2 mb-6">
          <div className="flex-1 h-1 rounded-full bg-cyan-500" />
          <div className={`flex-1 h-1 rounded-full transition-all ${step === 2 ? 'bg-cyan-500' : 'bg-white/10'}`} />
        </div>

        {/* Registration box */}
        <div className="bg-[#151c29] px-8 py-6 backdrop-blur-md border border-white/8 rounded-2xl">
          {step === 1 ? (

            // Step 1 Form
            <form onSubmit={handleNext} className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2 font-medium">Full Name</label>
                <input
                  type="text"
                  value={form.userName}
                  name='userName'
                  onChange={handleChange} placeholder="Arjun Sharma"
                  className="w-full bg-[#1b2335] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2 font-medium">Email</label>
                <input
                  type="email"
                  value={form.email}
                  name='email'
                  onChange={handleChange} placeholder="you@example.com"
                  className="w-full bg-[#1b2335] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2 font-medium">Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  name='phone'
                  onChange={handleChange} placeholder="98765 43210"
                  className="w-full bg-[#1b2335] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2 font-medium">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    name='password'
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    className="w-full bg-[#1b2335] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 pr-11"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <button type="submit" className="w-full  bg-cyan-500 hover:bg-cyan-400 text-white font-medium px-5 py-2 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 mt-1.5 cursor-pointer">Continue →</button>
            </form>
          ) : (

            // Step 2 form
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2 font-medium">Date of Birth</label>
                <input
                  type="date"
                  value={form.dob}
                  name='dob'
                  onChange={handleChange} className="w-full bg-[#1b2335] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20"
                  required
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm text-white/60 mb-2 font-medium">Gender</label>
                <div className="flex gap-3">
                  {['Male', 'Female', 'Other'].map(g => (
                    <button key={g} type="button" onClick={() => update('gender', g)}
                      className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all ${form.gender === g ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-white/5 border-white/10 text-white/50 hover:border-white/20'}`}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-sm text-white/60 mb-2 font-medium">Blood Group</label>
                <div className="grid grid-cols-4 gap-2">
                  {bloodGroups.map(bg => (
                    <button key={bg} type="button" onClick={() => update('bloodGroup', bg)}
                      className={`py-2.5 rounded-xl border text-sm font-mono font-bold transition-all ${form.bloodGroup === bg ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-white/5 border-white/10 text-white/50 hover:border-white/20'}`}>
                      {bg}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">

                <button type="button" onClick={() => setStep(1)} className="flex-1  bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 hover:border-white/20 cursor-pointer font-medium px-5 py-2.5 rounded-xl transition-all duration-200 active:scale-95">← Back</button>

                <button type="submit" disabled={loading} className="flex-1  bg-cyan-500 hover:bg-cyan-400 text-white font-medium px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95  flex items-center cursor-pointer justify-center gap-2">
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating...</> : 'Create Account'}
                </button>

              </div>
            </form>
          )}

          <div className="mt-5 text-center text-sm">
            <span className="text-white/40">Already have an account? </span>
            <Link to="/login" className="text-cyan-400 underline hover:text-cyan-300 font-medium">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage