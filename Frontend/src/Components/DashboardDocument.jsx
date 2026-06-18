import { useState } from 'react'
import { Upload, Search, Filter, FileText, Download, Eye, Trash2, Tag, X, CheckCircle2 } from 'lucide-react'
import clsx from 'clsx'
import AllDocuments from './assets/AllDocument'


const docTypes = ['All', 'Lab Report', 'Radiology', 'Prescription', 'Cardiology', 'Orthopedic']

const typeColors = {
    'Lab Report': 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    'Radiology': 'bg-violet-500/10 text-violet-500 border-violet-500/20',
    'Prescription': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    'Cardiology': 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    'Orthopedic': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
}


function DashboardDocument() {

    const [filter, setFilter] = useState('All')
    const [search, setSearch] = useState('')
    const [dragOver, setDragOver] = useState(false)
    const [uploaded, setUploaded] = useState(false)
    const [docs, setDocs] = useState(AllDocuments)
    const [newDocument, setNewDocument] = useState(AllDocuments)
    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({ name: '', hospital: '', doctor: '', type: '', size: '', format: '', doc: '' })

    const addAppointment = (e) => {
        e.preventDefault()

        setNewAppointment(prev => [
            {
                id: `apt_${Date.now()}`,
                ...form,
                status: 'upcoming'
            },
            ...prev,
        ])

        setShowForm(false)

        setForm({
            name: '',
            hospital: '',
            doctor: '',
            type: '',
            size: '',
            format: '',
            doc: ''
        })
    }


    const filtered = docs.filter(d =>
        (filter === 'All' || d.type === filter) &&
        (d.name.toLowerCase().includes(search.toLowerCase()) || d.hospital.toLowerCase().includes(search.toLowerCase()))
    )

    const handleDrop = (e) => {
        e.preventDefault()
        setDragOver(false)
        setUploaded(true)
        setTimeout(() => setUploaded(false), 3000)
        setForm(p => ({ ...p, doc: e.target.value }))
    }


    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className=" text-2xl font-bold text-white">Documents</h1>
                    <p className="text-white/40 text-sm mt-1">{docs.length} records stored securely</p>
                </div>

                <label className=" bg-cyan-500 hover:bg-cyan-400 text-white font-medium px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 text-sm flex items-center gap-2 cursor-pointer">
                    <Upload className="w-4 h-4" />
                    Upload Document
                    <button onClick={() => { setShowForm(true) }} />
                </label>
            </div>


            {/* Book form modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className=" bg-[#17202b] backdrop-blur-md border border-white/8 rounded-2xl p-7 w-full max-w-md animate-in">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-white">New Document</h2>
                            <button onClick={() => setShowForm(false)} className="text-white/30 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={addAppointment} className="space-y-4">

                            <div >
                                <div>
                                    <label className="block text-xs text-white/40 mb-1.5">Test Name</label>
                                    <input
                                        value={form.doctor}
                                        onChange={e => setForm(p => ({
                                            ...p,
                                            name: e.target.value
                                        }))}
                                        className=" w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm py-2.5"
                                        placeholder="MRI Brain Scan"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-white/40 mb-1.5">Hospital / Clinic</label>
                                    <input
                                        value={form.doctor}
                                        onChange={e => setForm(p => ({
                                            ...p,
                                            hospital: e.target.value
                                        }))}
                                        className=" w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm py-2.5"
                                        placeholder="Hospital name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-white/40 mb-1.5">Doctor</label>
                                    <input
                                        value={form.specialty}
                                        onChange={e => setForm(p => ({ ...p, doctor: e.target.value }))}
                                        className=" w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm py-2.5"
                                        placeholder="Doctor name"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 ">
                                <div>
                                    <label className="block text-xs text-white/40 mb-1.5">Document Type</label>
                                    <input
                                        type="text"
                                        value={form.date}
                                        onChange={e => setForm(p => ({ ...p, type: e.target.value }))}

                                        className=" w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm"
                                        required
                                        placeholder='Cardiology'
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-white/40 mb-1.5">Size</label>
                                    <input
                                        type="text"
                                        value={form.time}
                                        onChange={e => setForm(p => ({ ...p, size: e.target.value }))}
                                        className=" w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm "
                                        required
                                        placeholder='1.2 MB'
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-white/40 mb-1.5">Format</label>
                                    <input
                                        type="text"
                                        value={form.date}
                                        onChange={e => setForm(p => ({ ...p, format: e.target.value }))}

                                        className=" w-full bg-[#192638] border border-white/10 focus:border-cyan-500/60 text-white placeholder:text-white/30 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500/20 text-sm"
                                        required
                                        placeholder='PDF'
                                    />
                                </div>
                            </div>

                            {/* Upload success toast */}
                            {uploaded && (
                                <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm animate-in">
                                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                                    Document uploaded successfully!
                                </div>
                            )}


                            {/* Drop zone */}
                            <div
                                onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={handleDrop}
                                className={` border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-200 cursor-pointer ${(dragOver) ? 'border-cyan-500 bg-cyan-500/5' : 'border-white/10'} hover:border-white/20 `}
                            >
                                <Upload className={`w-8 h-8 mx-auto mb-3 transition-colors ${(dragOver) ? 'text-cyan-400' : 'text-white/20'} `} />
                                <p className="text-white/50 text-sm">Drag & drop files here, or <span className="text-cyan-400">browse</span></p>
                                <p className="text-white/25 text-xs mt-1">PDF, DICOM, JPG, PNG — max 100MB</p>

                                <label className=" border-dashed border border-gray-600 hover:border-gray-300 mt-2 text-white font-medium px-5 py-2.5 rounded-xl transition-all duration-200 active:scale-95 text-sm flex items-center justify-center gap-2 cursor-pointer">
                                    <Upload className="w-4 h-4" />
                                    Upload Document
                                    <input type="file" className="hidden" multiple accept=".pdf,.jpg,.png,.dicom" onChange={(e) => { setUploaded(true); setForm(p => ({ ...p, doc: e.target.value })); setTimeout(() => setUploaded(false), 3000) }} />
                                </label>
                            </div>


                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="flex-1  bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 hover:border-white/20 font-medium px-5  rounded-xl transition-all duration-200 active:scale-95 text-sm py-3">Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="flex-1  bg-cyan-500 hover:bg-cyan-400 text-white font-medium cursor-pointer px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 text-sm">Add Document
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-3 ">

                {/* Search */}
                <div className="relative flex-1 ">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                        type="text"
                        placeholder="Search documents..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full bg-[#141f2e] border border-white/10 focus:border-primary-500/60 text-white placeholder:text-white/30 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary-500/20 pl-10 text-sm"
                    />
                </div>

                {/* Filter */}
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {docTypes.map(t => (
                        <button
                            key={t}
                            onClick={() => setFilter(t)}
                            className={`px-3.5 py-2 rounded-xl text-sm font-medium whitespace-nowrap border transition-all ${(filter === t) ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400' : "bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/20"}
                            `}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* Documents grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map(doc => (
                    <div key={doc.id} className=" bg-[#111b29] backdrop-blur-md border border-white/8 rounded-2xl p-5 group hover:border-white/15 transition-all">
                        <div className="flex items-start gap-4">
                            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                                <FileText className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-white text-sm  mb-1 truncate">{doc.name}</p>
                                <p className="text-xs text-white/40">{doc.hospital} · {doc.doctor}</p>
                                <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                                    <span className={clsx(' inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border', typeColors[doc.type] || 'bg-white/5 text-white/40')}>{doc.type}</span>
                                    <span className="text-xs text-white/25">{doc.date}</span>
                                    <span className="text-xs text-white/25">{doc.size}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4 pt-3.5 border-t border-white/5">
                            <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs text-white/50 hover:text-white bg-white/3 hover:bg-white/8 rounded-lg transition-all">
                                <Eye className="w-3.5 h-3.5" /> View
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs text-white/50 hover:text-cyan-400 bg-white/3 hover:bg-cyan-500/10 rounded-lg transition-all">
                                <Download className="w-3.5 h-3.5" /> Download
                            </button>
                            <button className="px-3 py-2 text-xs text-white/30 hover:text-accent-rose bg-white/3 hover:bg-accent-rose/10 rounded-lg transition-all">
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-16 text-white/20">
                    <FileText className="w-10 h-10 mx-auto mb-3" />
                    <p className="font-medium">No documents found</p>
                    <p className="text-sm mt-1">Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    )
}

export default DashboardDocument
