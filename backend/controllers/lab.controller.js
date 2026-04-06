import Lab from "../models/lab.model.js";


// ✅ CREATE LAB
export const createLab = async (req, res) => {
  try {
    const lab = await Lab.create(req.body);
    res.status(201).json(lab);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ SEARCH NEAREST LABS
export const searchLabs = async (req, res) => {
  try {
    const { lat, lng, maxDistance = 5 } = req.body;

    const labs = await Lab.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [lng, lat],
          },
          distanceField: "distance",
          maxDistance: maxDistance * 1000,
          spherical: true,
        },
      },
    ]);

    res.json(labs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ GET SINGLE LAB
export const getLabById = async (req, res) => {
  try {
    const lab = await Lab.findById(req.params.id);

    if (!lab) {
      return res.status(404).json({ message: "Lab not found" });
    }

    res.json(lab);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};