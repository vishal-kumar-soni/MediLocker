import { DocumentModel } from "../Models/document.model.js";
import { UserModel } from "../Models/user.model.js";

const addDocument = async (req, res) => {
    try {
        const { userId, name, hospital, doctor, type, size, format, documentUrl,
        } = req.body;

        const newDocument = await DocumentModel.create({
            userId,
            name,
            hospital,
            doctor,
            type,
            size,
            format,
            doc:documentUrl,
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
    };
}

// Function to Delete a Document
const deleteDocument = async (req, res) => {
    const { documentId } = req.body;

    try {
        const deletedDocument = await DocumentModel.findByIdAndDelete(documentId);

        if (!deletedDocument) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Document deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



export { addDocument, deleteDocument }