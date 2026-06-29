import { OrganHealth } from "../Models/organHealth.model.js";
import { UserModel } from "../Models/user.model.js";

const createOrganHealth = async (req, res) => {
    try {
        const { userId } = req.body;

        // Create Organ Health
        const organHealth = await OrganHealth.create({
            user: userId,
        });

        // Save its reference in User
        await UserModel.findByIdAndUpdate(
            userId,
            {
                $push: {
                    organHealthRecords: organHealth._id,
                },
            }
        );

        return res.status(201).json({
            success: true,
            message: "Organ Health created successfully.",
            organHealth,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export { createOrganHealth };
