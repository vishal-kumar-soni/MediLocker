import { FileText, Calendar, Pill, Activity } from 'lucide-react'
import recentDocument from './AllDocument'
import Medications from './Medications'
import appointments,{noOfUpcomingAppointments} from './Appointments'

let statCards = [

    {
        label: 'Documents',
        value: recentDocument.length,
        icon: FileText,
        color: 'text-cyan-500',
        bg: 'bg-cyan-500/10',
        link: '/dashboard/documents'
    },

    {
        label: 'Medications',
        value: Medications.length,
        icon: Pill,
        color: 'text-violet-500',
        bg: 'bg-violet-500/10',
        link: '/dashboard/medications'
    },

    {
        label: 'Upcoming Visits',
        value: noOfUpcomingAppointments,
        icon: Calendar,
        color: 'text-yellow-600',
        bg: 'bg-amber-500/10',
        link: '/dashboard/appointments'
    },

    {
        label: 'Health Score',
        value: `${82}%`,
        icon: Activity,
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        link: '/dashboard/organs'
    },
]

export default statCards