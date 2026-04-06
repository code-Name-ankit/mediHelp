import mongoose from "mongoose";

const labSchema = new mongoose.Schema(
  {
    labName: {
      type: String,
      required: true,
    },
    address: String,

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true,
      },
    },

    tests: [
      {
        name: String,
        price: Number,
      },
    ],

    rating: {
      type: Number,
      default: 4.5,
    },

    open24: {
      type: Boolean,
      default: true,
    },

    homeCollection: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// 🔥 IMPORTANT (Geo index)
labSchema.index({ location: "2dsphere" });

export default mongoose.model("Lab", labSchema);