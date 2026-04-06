import Report from "../models/Report.js";

export const uploadReport = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const report = await Report.create({
      bookingId,
      fileUrl: req.file.path
    });

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};