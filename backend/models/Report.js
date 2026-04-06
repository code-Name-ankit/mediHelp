import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  fileUrl: String
}, { timestamps: true });

export default mongoose.model("Report", reportSchema);