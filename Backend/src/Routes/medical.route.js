import {Router} from 'express'
const router = Router()
import {medication} from '../Controller/medication.controller.js'
import { appointment } from '../Controller/appointment.controller.js';
import { addOrganHealth } from '../Controller/organHealth.controller.js';
import { saveBloodValues } from '../Controller/bloodReport.controller.js';


router.post("/medication", medication);
router.post('/appointment', appointment);
router.post('/organHealth', addOrganHealth)
router.post('/bloodReport', saveBloodValues)

export default router