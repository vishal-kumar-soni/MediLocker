import { DocumentModel } from "../Models/document.model.js";
import { UserModel } from "../Models/user.model.js";

const addDocument = async (req, res) => {
    try {
        const { userId, name, hospital, doctor, type, size, format, doc,
        } = req.body;

        const newDocument = await DocumentModel.create({
            userId,
            name,
            hospital,
            doctor,
            type,
            size,
            format,
            doc,
        });

        await UserModel.findByIdAndUpdate(
            userId,
            {
                $push: {
                    documents: newDocument._id,
                },
            }
        );

        res.status(200).json({
            success: true,
            message: "Document created successfully",
            newDocument,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export { addDocument }