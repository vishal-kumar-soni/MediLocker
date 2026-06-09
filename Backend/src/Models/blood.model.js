import mongoose from "mongoose";

const bloodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hemoglobin: Number,
  rbc: Number,
  wbc: Number,
  platelets: Number,
  hematocrit: Number,
  glucose: Number,
  cholesterol: Number,
  triglycerides: Number
},
  {
    timestamps: true
  }
);

export const BloodModel = mongoose.model("Blood", bloodSchema);
