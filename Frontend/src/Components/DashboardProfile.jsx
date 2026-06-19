import { useState } from 'react'
import { User, Phone, Plus, MapPin, UserRoundPen, Calendar, Droplets, Edit3, Save, X, AlertTriangle, Heart } from 'lucide-react'
import upload from './assets/profile.jpg'


function DashboardProfile() {

    const user = {
        name: "Arjun Sharma",
        email: "arjun@gmail.com",
        bloodGroup: "B+",
        gender: "Male",
        height: "172cm",
        weight: "72kg",
        phone: "+91 9876543210",
        dob: "29-02-1998",
        address: "Ratu Road, Ranchi",
        allergies: ["Penicillin", "dust"],
        conditions: ["Mild Hypertension"],
        profileImage:''
    }

    const fields = [
        { label: 'Full Name', key: 'name', icon: User },
        { label: 'Email', key: 'email', icon: User },
        { label: 'Phone', key: 'phone', icon: Phone },
        { label: 'Date of Birth', key: 'dob', icon: Calendar, type: 'date' },
        { label: 'Address', key: 'address', icon: MapPin },
        { label: 'Emergency Contact', key: 'emergencyContact', icon: Phone },
    ]

    const [showForm, setShowForm] = useState(false);
    const [image, setImage] = useState(false);
    const [form, setForm] = useState(user)

    const handleUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleArrayChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
        });
    };

    const setProfileHandler = (e) => {
        e.preventDefault()

        setShowForm(false)

        console.log(form)
    }


    const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

    return (
        <div className="space-y-6 max-w-5xl ">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-display text-2xl font-bold text-white">My Profile</h1>
                    <p className="text-white/40 text-sm mt-1">Manage your personal and health information</p>
                </div>

                <button onClick={() => setShowForm(true)} className=" bg-cyan-500 hover:bg-cyan-400 text-white font-medium px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 text-sm flex items-center gap-2">
                    <UserRoundPen className="w-4 h-4" /> Edit Profile
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className=" bg-[#17202b] backdrop-blur-md border border-white/8 rounded-2xl p-7 w-full max-w-md animate-in">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-white">New Appointment</h2>
                            <button onClick={() => setShowForm(false)} className="text-white/30 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>

                        {/* Form */}
                        <form onSubmit={setProfileHandler} className="space-y-4">

                            <div id="objectPicture" className="w-[70px] h-[60px] flex items-baseline justify-center rounded-sm border-2 border-gray-400 cursor-pointer  mb-5">

                                <label htmlFor="file-input">

                                    <img
                                        id="objectPicture-image"
                                        src={image ? URL.createObjectURL(image) : upload}
                                        className="w-[80px] h-[58px] cursor-pointer"
                                        alt="upload"
                                    />

                                </label>

                                <input
                                    onChange={handleUpload}
                                    type="file"
                                    name="image"
                                    id="file-input"
                                    hidden
                                />

                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Blood group */}
                                <div>
                                    <label className="block text-xs text-white/40 mb-1.5 ">
                                        Blood Group
                                    </label>
                                    <select
                                        name="bloodGroup"
                                        value={form.bloodGroup}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm py-2.5"
                                    >
                                        <option value="">Select Blood Group</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="block text-xs text-white/40 mb-1.5">
                                        Gender
                                    </label>
                                    <select
                                        name="gender"
                                        value={form.gender}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm py-2.5"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Height */}
                                <div>
                                    <label className="block text-xs text-white/40 mb-1.5 ">
                                        Height (cm)
                                    </label>
                                    <input
                                        type="number"
                                        name="height"
                                        value={form.height}
                                        onChange={handleChange}
                                        min="30"
                                        max="300"
                                        placeholder='172cm'
                                        required
                                        className="w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm py-2.5"
                                    />
                                </div>

                                {/* Weight */}
                                <div>
                                    <label className="block text-xs text-white/40 mb-1.5">
                                        Weight (kg)
                                    </label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={form.weight}
                                        onChange={handleChange}
                                        min="1"
                                        max="500"
                                        placeholder='65kg'
                                        required
                                        className="w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm py-2.5"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Phone */}
                                <div>
                                    <label className="block text-xs text-white/40 mb-1.5 ">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        pattern="[0-9]{10}"
                                        required
                                        className="w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm py-2.5"
                                    />
                                </div>

                                {/* Date of birth */}
                                <div>
                                    <label className="block text-xs text-white/40 mb-1.5">
                                        Date Of Birth
                                    </label>
                                    <input
                                        type="date"
                                        name="dob"
                                        value={form.dob}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm py-2.5"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Allergies */}
                                <div>
                                    <label className="block text-xs text-white/40 mb-1.5 ">
                                        Allergies
                                    </label>
                                    <input
                                        type="text"
                                        name="allergies"
                                        placeholder="Peanuts, Dust, Pollen"
                                        onChange={handleArrayChange}
                                        className="w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm py-2.5"
                                    />
                                </div>

                                {/* Conditions */}
                                <div>
                                    <label className="block text-xs text-white/40 mb-1.5">
                                        Medical Conditions
                                    </label>
                                    <input
                                        type="text"
                                        name="conditions"
                                        placeholder="Diabetes, Asthma, Hypertension"
                                        onChange={handleArrayChange}
                                        className="w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm py-2.5"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs text-white/40 mb-1.5">Address</label>
                                <textarea
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    rows="1"
                                    required
                                    className="w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm py-2.5"
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

            {/* Avatar + summary */}
            <div className=" bg-[#1a222d] backdrop-blur-md border border-white/8 rounded-2xl p-6 flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl  bg-cyan-500  flex items-center justify-center text-3xl font-bold font-display text-white">
                    {initials}
                </div>
                <div>
                    <h2 className="font-ss text-xl  text-white">{user?.name}</h2>
                    <p className="text-white/40 text-sm mt-1">{user?.email}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                            <Droplets className="w-3 h-3" /> {user?.bloodGroup}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 text-white/50">{user?.gender}</span>

                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 text-white/50">{user?.height}</span>

                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 text-white/50">{user?.weight}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Personal Info */}
                <div className=" bg-[#1a222d] backdrop-blur-md border border-white/8 rounded-2xl p-7">
                    <h2 className="text-xl font-semibold text-white mb-4">Personal Information</h2>
                    <div className="space-y-6 ">
                        {fields.map(f => (
                            <div key={f.key}>
                                <label className="block text-xs text-white/40 mb-1.5 font-medium uppercase tracking-wide">{f.label}</label>
                                <div className="flex items-center gap-2.5 text-sm text-white">
                                    <f.icon className="w-4 h-4 text-white/30 shrink-0" />
                                    <span>{user?.[f.key] || '—'}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Health Info */}
                <div className="space-y-5">
                    {/* Vitals */}
                    <div className=" bg-[#1a222d] backdrop-blur-md border border-white/8 rounded-2xl p-5">
                        <h2 className="text-xl font-semibold text-white mb-4">Health Vitals</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: 'Height', value: user?.height, color: 'text-cyan-500' },
                                { label: 'Weight', value: user?.weight, color: 'text-violet-500' },
                                { label: 'Blood Group', value: user?.bloodGroup, color: 'text-rose-500' },
                                { label: 'Gender', value: user?.gender, color: 'text-amber-500' },
                            ].map(v => (
                                <div key={v.label} className="bg-white/3 rounded-xl p-3.5 border border-white/5">
                                    <p className="text-xs text-white/40 mb-1">{v.label}</p>
                                    <p className={` font-bold text-lg ${v.color}`}>{v.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Allergies */}
                    <div className=" bg-[#1a222d] backdrop-blur-md border border-white/8 rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                            <h2 className="text-xl font-semibold text-white">Allergies</h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {user?.allergies?.map(a => (
                                <span key={a} className="inline-flex items-center gap-1.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20 py-1 px-3 ">
                                    {a}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Conditions */}
                    <div className=" bg-[#1a222d] backdrop-blur-md border border-white/8 rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <Heart className="w-4 h-4 text-rose-500" />
                            <h2 className="text-xl font-semibold text-white">Chronic Conditions</h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {user?.conditions?.map(c => (
                                <span key={c} className="inline-flex items-center gap-1.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-500 border border-rose-500/20 py-1 px-3">
                                    {c}
                                </span>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardProfile
