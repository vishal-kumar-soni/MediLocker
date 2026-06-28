import { Router } from 'express'
const router = Router()
import { deleteMedication, medication } from '../Controller/medication.controller.js'
import { appointment, deleteAppointment } from '../Controller/appointment.controller.js';
import { addOrganHealth } from '../Controller/organHealth.controller.js';
import { saveBloodValues, updateBloodReport } from '../Controller/bloodReport.controller.js';
import { addDocument, deleteDocument } from '../Controller/document.controller.js'
import {isAuth} from '../Middleware/isAuth.middleware.js'


router.post("/medication", isAuth, medication);
router.post("/deletemedication",isAuth,  deleteMedication);
router.post('/appointment', isAuth, appointment);
router.post('/deletedappointment', isAuth, deleteAppointment);
router.post('/organHealth', isAuth, addOrganHealth)
router.post('/bloodReport', isAuth, saveBloodValues)
router.post('/updateblood', isAuth, updateBloodReport)
router.post('/document',isAuth, addDocument)
router.post('/deletedocument', deleteDocument)

export default router;