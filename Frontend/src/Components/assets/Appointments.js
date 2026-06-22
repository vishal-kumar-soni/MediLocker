
const mockAppointments = [
    {
        id: 1,
        status: "upcoming",
        doctor: "Dr. Alok Mishra",
        specialty: "Cardiologist",
        date: "20-06-2026",
        time: "10:30 AM",
        hospital: "Apollo Clinic",
        type: "Follow-up",
    },
    {
        id: 2,
        status: "upcoming",
        doctor: "Dr. Sunita Rao",
        specialty: "Pulmonologist",
        date: "13-06-2026",
        time: "2:00 PM",
        hospital: "Pulse Hospital",
        type: "Routine Checkup",
    },
    {
        id: 3,
        status: "upcoming",
        doctor: "Dr. Aditya Swarankar",
        specialty: "Immunologists",
        date: "10-07-2026",
        time: "11:00 AM",
        hospital: "Manipal Hospital",
        type: "Blood Test Review",
    },
    {
        id: 4,
        status: "completed",
        doctor: "Dr. Rajesh Mehta",
        specialty: "General Physician",
        date: "22-04-2026",
        time: "11:00 AM",
        hospital: "RIMS Ranchi",
        type: "Blood Test Review",
    },
]

let noOfUpcomingAppointments = 0;
mockAppointments.filter(item => {
    if (item.status === 'upcoming') {
        noOfUpcomingAppointments++;
    }
});


export { noOfUpcomingAppointments }
export default mockAppointments;