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

const updateOrganHealth = async (req, res) => {
    try {
        const { userId, organs } = req.body;

        const organHealth = await OrganHealth.findOne({ user: userId });

        if (!organHealth) {
            return res.status(404).json({
                success: false,
                message: "Organ health record not found.",
            });
        }

        organs.forEach((organ) => {
            if (organHealth[organ.name]) {
                organHealth[organ.name] = {
                    status: organ.status,
                    lastCheck: organ.lastCheck,
                    note: organ.note,
                    score: organ.score,
                };
            }
        });

        await organHealth.save();

        return res.status(200).json({
            success: true,
            message: "✅ Organ health updated successfully.",
            organHealth,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export { createOrganHealth, updateOrganHealth };
