import mongoose from "mongoose";

const organHealthSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        heart: {
            status: { type: String, default: "Healthy" },
            lastCheck: { type: String, default: "" },
            note: { type: String, default: "" },
            score: { type: String, default: "80" }
        },

        lungs: {
            status: { type: String, default: "Healthy" },
            lastCheck: { type: String, default: "" },
            note: { type: String, default: "" },
            score: { type: String, default: "80" }
        },

        liver: {
            status: { type: String, default: "Healthy" },
            lastCheck: { type: String, default: "" },
            note: { type: String, default: "" },
            score: { type: String, default: "80" }
        },

        kidney: {
            status: { type: String, default: "Healthy" },
            lastCheck: { type: String, default: "" },
            note: { type: String, default: "" },
            score: { type: String, default: "80" }
        },

        brain: {
            status: { type: String, default: "Healthy" },
            lastCheck: { type: String, default: "" },
            note: { type: String, default: "" },
            score: { type: String, default: "80" }
        },

        bones: {
            status: { type: String, default: "Healthy" },
            lastCheck: { type: String, default: "" },
            note: { type: String, default: "" },
            score: { type: String, default: "80" }
        },
    },
    { timestamps: true }
);

export const OrganHealth = mongoose.model("OrganHealth", organHealthSchema);
