import { useState } from 'react'
import { Upload, Search, Filter, FileText, Download, Eye, Trash2, Tag, X, CheckCircle2 } from 'lucide-react'
import clsx from 'clsx'

const docTypes = ['All', 'Lab Report', 'Radiology', 'Prescription', 'Cardiology', 'Orthopedic']

const typeColors = {
    'Lab Report': 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    'Radiology': 'bg-violet-500/10 text-violet-500 border-violet-500/20',
    'Prescription': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    'Cardiology': 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    'Orthopedic': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
}

const AllDocuments = [
    {
        id: 1,
        name: "Blood Test Report — Nov 2024",
        hospital: "AIIMS Patna",
        doctor: "Dr. Rajesh Kumar",
        type: "Lab Report",
        date: "2024-11-10",
        size: "2.4 MB",
        tags: ["blood", "routine"],
        format: "PDF"
    },
    {
        id: 2,
        name: "Chest X-Ray",
        hospital: "Max Healthcare",
        doctor: "Dr. Sunita Rao",
        type: "Radiology",
        date: "2024-10-22",
        size: "5.1 MB",
        tags: ["xray", "lungs"],
        format: "DICOM"
    },
    {
        id: 3,
        name: "Prescription — Hypertension",
        hospital: "Apollo Clinic",
        doctor: "Dr. Alok Mishra",
        type: "Prescription",
        date: "2024-09-30",
        size: "0.8 MB",
        tags: ["prescription", "hypertension"],
        format: "PDF"
    },
    {
        id: 4,
        name: "ECG Report",
        hospital: "Fortis Hospital",
        doctor: "Dr. Priya Singh",
        type: "Cardiology",
        date: "2024-08-15",
        size: "1.2 MB",
        tags: ["ecg", "heart"],
        format: "PDF"
    },
    {
        id: 5,
        name: "MRI Brain Scan",
        hospital: "AIIMS Patna",
        doctor: "Dr. Vikram Patel",
        type: "Radiology",
        date: "2024-08-20",
        size: "48.2 MB",
        tags: ["mri", "brain"],
        format: "PDF"
    },
    {
        id: 6,
        name: "Bone Density Scan",
        hospital: "NMC Hospital",
        doctor: "Dr. Anand Kumar",
        type: "Orthopedic",
        date: "2024-07-12",
        size: "3.7 MB",
        tags: ["bones", "dxa"],
        format: "PDF"
    },
];


function DashboardDocument() {

    const [filter, setFilter] = useState('All')
    const [search, setSearch] = useState('')
    const [dragOver, setDragOver] = useState(false)
    const [uploaded, setUploaded] = useState(false)
    const [docs, setDocs] = useState(AllDocuments)

    const filtered = docs.filter(d =>
        (filter === 'All' || d.type === filter) &&
        (d.name.toLowerCase().includes(search.toLowerCase()) || d.hospital.toLowerCase().includes(search.toLowerCase()))
    )

    const handleDrop = (e) => {
        e.preventDefault()
        setDragOver(false)
        setUploaded(true)
        setTimeout(() => setUploaded(false), 3000)
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
                    <input type="file" className="hidden" multiple accept=".pdf,.jpg,.png,.dicom" onChange={() => { setUploaded(true); setTimeout(() => setUploaded(false), 3000) }} />
                </label>
            </div>

            {/* Upload success toast */}
            {uploaded && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm animate-in">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    Document uploaded successfully!
                </div>
            )}

            {/* Drop zone */}
            <div
                onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={clsx(
                    'border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-200 cursor-pointer',
                    dragOver ? 'border-cyan-500 bg-cyan-500/5' : 'border-white/10 hover:border-white/20'
                )}
            >
                <Upload className={clsx('w-8 h-8 mx-auto mb-3 transition-colors', dragOver ? 'text-cyan-400' : 'text-white/20')} />
                <p className="text-white/50 text-sm">Drag & drop files here, or <span className="text-cyan-400">browse</span></p>
                <p className="text-white/25 text-xs mt-1">PDF, DICOM, JPG, PNG — max 100MB</p>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                        type="text"
                        placeholder="Search documents..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full bg-[#141f2e] border border-white/10 focus:border-primary-500/60 text-white placeholder:text-white/30 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary-500/20 pl-10 text-sm"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {docTypes.map(t => (
                        <button
                            key={t}
                            onClick={() => setFilter(t)}
                            className={clsx(
                                'px-3.5 py-2 rounded-xl text-sm font-medium whitespace-nowrap border transition-all',
                                filter === t
                                    ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
                                    : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/20'
                            )}
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
                                    <span className={clsx(' inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border text-xs', typeColors[doc.type] || 'bg-white/5 text-white/40')}>{doc.type}</span>
                                    <span className="text-xs text-white/25">{doc.date}</span>
                                    <span className="text-xs text-white/25">{doc.size}</span>
                                </div>
                                {doc.tags?.length > 0 && (
                                    <div className="flex items-center gap-1 mt-2">
                                        <Tag className="w-3 h-3 text-white/20" />
                                        {doc.tags.map(tag => (
                                            <span key={tag} className="text-xs text-white/25">#{tag}</span>
                                        ))}
                                    </div>
                                )}
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
