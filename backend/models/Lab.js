import mongoose from "mongoose";

const labSchema = new mongoose.Schema({
  name: String,
  address: String,
  lat: Number,
  lng: Number,
  testsAvailable: [String],
  phone: String
}, { timestamps: true });

export default mongoose.model("Lab", labSchema);