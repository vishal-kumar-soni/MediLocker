import { appointmentModel } from "../Models/appointment.model.js";
import { UserModel } from "../Models/user.model.js";


const appointment = async (req, res) => {

    const { userId, doctor, speciality, hospital, date, time, type, currStatus } = req.body;

    try {

        // Create Appointment
        const createdAppointment = await appointmentModel.create({
            user: userId,
            doctor,
            speciality,
            hospital,
            date,
            time,
            type,
            status: currStatus
        });

        // Push appointment id into user model
        await UserModel.findByIdAndUpdate(
            userId,
            {
                $push: {
                    appointments: createdAppointment._id,
                },
            },
            { new: true }
        );

        return res.status(201).json({
            success: true,
            message: "appointment created successfully",
            appointment: createdAppointment,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Could not create appointment",
            error: error.message,
        });
    }
};

// Function to Delete a Document
const deleteAppointment = async (req, res) => {
    const { appointmentId } = req.body;

    try {
        const deleteAppointment = await appointmentModel.findByIdAndDelete(appointmentId);

        if (!deleteAppointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Appointment deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export { appointment, deleteAppointment }