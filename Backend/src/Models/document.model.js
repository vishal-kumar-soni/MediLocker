import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        name: {
            type: String,
            required: true,
        },

        hospital: String,

        doctor: String,

        type: String,

        // fileUrl: String,

        size: String,

        format: String,

        doc: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
    }
);

export const DocumentModel = mongoose.model("Document", documentSchema);