import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const { labId, testType, bookingType, address } = req.body;

    const booking = await Booking.create({
      userId: req.user._id,
      labId,
      testType,
      bookingType,
      address
    });

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};