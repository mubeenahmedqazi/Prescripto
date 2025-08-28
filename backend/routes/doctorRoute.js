import express from 'express'
import { doctorList, loginDoctor, appointmentsDoctor } from '../controllers/doctorController.js'
import authDoctor from '../middlewears/authDoctor.js'

const doctorRouter = express.Router()

// Route to fetch doctor list
doctorRouter.get('/list', doctorList)

// Route for doctor login
doctorRouter.post('/login', loginDoctor)

// Route for doctor appointments (protected)
doctorRouter.get('/appointments', authDoctor, appointmentsDoctor)

export default doctorRouter
