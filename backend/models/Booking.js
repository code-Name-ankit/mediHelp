import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  labId: { type: mongoose.Schema.Types.ObjectId, ref: "Lab" },

  testType: String,
  bookingType: { type: String, enum: ["home", "lab"] },

  status: {
    type: String,
    enum: ["pending", "collected", "completed"],
    default: "pending"
  },

  address: String
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);