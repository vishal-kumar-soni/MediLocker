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

const updateBloodReport = async (req, res) => {

    const { userId, name, value } = req.body;
    console.log(req.body)

    try {

        const user = await UserModel.findById({ _id: userId })

        console.log("User:", user);

        const blood = await BloodModel.findOneAndUpdate(
            { userId: user._id },
            { [name]: value }, // computed property name
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Blood Component updated successfully",
            blood
        })

    } catch (error) {
        return res.status(500).json({
            error: error.message,
            success: false,
            message: "Something went wrong while updating blood component",
        })
    }
}

export { saveBloodValues, updateBloodReport }