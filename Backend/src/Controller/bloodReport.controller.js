import { BloodModel } from "../Models/blood.model.js";
import { UserModel } from "../Models/user.model.js";

const saveBloodValues = async (req, res) => {
    try {
        const {
            userId,
            hemoglobin,
            rbc,
            wbc,
            platelets,
            hematocrit,
            glucose,
            cholesterol,
            triglycerides,
        } = req.body;

        const bloodReport = await BloodModel.create({
            userId,
            hemoglobin,
            rbc,
            wbc,
            platelets,
            hematocrit,
            glucose,
            cholesterol,
            triglycerides,
        });

        await UserModel.findByIdAndUpdate(
            userId,
            {
                $push: {
                    bloodRecords: bloodReport._id,
                },
            }
        );

        res.status(200).json({
            success: true,
            message: "Blood report created successfully",
            bloodReport,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateBloodReport = async (req, res)=>{

    const { userId, name, value } = req.body;

    try {

        const user = await UserModel.findById({ _id: userId })

        const blood = await BloodModel.findOneAndUpdate({userId:user._id},{name:value})

        return res.status(200).json({
            success: true,
            message: "User profile updated successfully",
            user: updatedUser
        })

    } catch (error) {
        return res.status(500).json({
            error: error.message,
            success: false,
            message: "Something went wrong while updating user",
        })
    }
}

export { saveBloodValues, updateBloodReport }