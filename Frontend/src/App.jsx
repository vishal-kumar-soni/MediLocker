import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import DashboardHome from './Components/DashboardHome.jsx'
import DashboardProfile from './Components/DashboardProfile.jsx'
import DashboardBloodReport from './Components/DashboardBloodReport.jsx'
import DashboardOrganHealth from './Components/DashboardOrganHealth.jsx'
import HumanOrgans from './Pages/HumanOrgans.jsx'
import DashboardAppointment from './Components/DashboardAppointment.jsx'
import DashboardMedication from './Components/DashboardMedication.jsx'
import DashboardDocument from './Components/DashboardDocument.jsx'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/body_organs' element={<HumanOrgans />} ></Route>
        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path='profile' element={<DashboardProfile />}></Route>
          <Route path='blood-report' element={<DashboardBloodReport />}></Route>
          <Route path="organs" element={<DashboardOrganHealth />}></Route>
          <Route path="appointments" element={<DashboardAppointment />}></Route>
          <Route path="medications" element={<DashboardMedication />}></Route>
          <Route path='documents' element={<DashboardDocument />}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
