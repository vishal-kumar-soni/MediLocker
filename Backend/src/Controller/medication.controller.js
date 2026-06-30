import {medicationModel} from "../Models/medication.model.js";
import { UserModel } from "../Models/user.model.js";


const medication = async (req, res) => {

    const { userId, name, dose, PrescribedFor, time, startDate } = req.body;

    try {

        // Create medication
        const createdMedication = await medicationModel.create({
            user: userId,
            name,
            dose,
            PrescribedFor,
            time,
            startDate
        });

        // Push medication id into user model
        await UserModel.findByIdAndUpdate(
            userId,
            {
                $push: {
                    medications: createdMedication._id,
                },
            },
            { new: true }
        );

        return res.status(201).json({
            success: true,
            message: "✅ Medication created successfully",
            medication: createdMedication,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Could not create medication",
            error: error.message,
        });
    }
};

// Function to Delete a Medication
const deleteMedication = async (req, res) => {
    const { medicationId } = req.body;

    console.log("done")
    try {
        const deletedMedication = await medicationModel.findByIdAndDelete(medicationId);

        if (!deletedMedication) {
            return res.status(404).json({
                success: false,
                message: "Medication not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "✅ Medication deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export { medication, deleteMedication }