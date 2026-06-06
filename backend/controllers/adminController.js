const Booking = require("../models/Booking");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

exports.getAllBookings = async (req, res) => {
  try {
    const { status, date } = req.query;
    const filter = {};
    if (status && status !== "all") filter.bookingStatus = status;
    if (date) filter.date = date;

    const bookings = await Booking.find(filter)
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.bookingStatus = "approved";
    await booking.save();

    // Send email if user email available
    if (booking.user?.email) {
      await sendEmail(
        booking.user.email,
        "✅ Go Dash Booking Confirmed!",
        `Hi ${booking.user.name},\n\nYour booking has been CONFIRMED!\n\nFacility: ${booking.facility}\nDate: ${booking.date}\nSlot: ${booking.slot}\nAmount Paid: ₹${booking.advancePaid}\n\nSee you on the court! 🏏🏓\n\n— Team Go Dash`
      );
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.bookingStatus = "rejected";
    await booking.save();

    if (booking.user?.email) {
      await sendEmail(
        booking.user.email,
        "❌ Go Dash Booking Update",
        `Hi ${booking.user.name},\n\nUnfortunately, your booking request has been declined.\n\nFacility: ${booking.facility}\nDate: ${booking.date}\nSlot: ${booking.slot}\n\nPlease try booking a different slot.\n\n— Team Go Dash`
      );
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};