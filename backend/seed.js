import mongoose from "mongoose";
import dotenv from "dotenv";
import Lab from "./models/lab.model.js";

dotenv.config();

// 🔌 DB CONNECT
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/medihelp");
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// 🌱 SEED DATA
const seedLabs = async () => {
  try {
    await connectDB();

    // ❌ Purana data delete (optional)
    await Lab.deleteMany();

    // ✅ New Data
    const labs = [
      {
        labName: "HealthPlus Lab",
        address: "Surat",
        location: {
          type: "Point",
          coordinates: [72.8311, 21.1702],
        },
        tests: [
          { name: "Blood Test", price: 200 },
          { name: "Covid Test", price: 500 },
        ],
      },
      {
        labName: "Care Diagnostic Center",
        address: "Adajan, Surat",
        location: {
          type: "Point",
          coordinates: [72.8035, 21.1950],
        },
        tests: [
          { name: "X-Ray", price: 300 },
          { name: "Urine Test", price: 150 },
        ],
      },
      {
        labName: "Apollo Lab",
        address: "Varachha, Surat",
        location: {
          type: "Point",
          coordinates: [72.8500, 21.2200],
        },
        tests: [
          { name: "Full Body Checkup", price: 1200 },
          { name: "Thyroid Test", price: 400 },
        ],
      },
    ];

    await Lab.insertMany(labs);

    console.log("✅ Labs Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedLabs();