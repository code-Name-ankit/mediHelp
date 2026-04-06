import Lab from "../models/Lab.js";
import { getDistance } from "../utils/distance.js";

export const getNearbyLabs = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    const labs = await Lab.find();

    const nearby = labs.map(lab => {
      const distance = getDistance(lat, lng, lab.lat, lab.lng);
      return { ...lab._doc, distance };
    });

    nearby.sort((a, b) => a.distance - b.distance);

    res.json(nearby);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};