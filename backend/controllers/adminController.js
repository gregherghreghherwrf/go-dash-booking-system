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
  "✅ Go Dash Booking Approved!",
  `Hi ${booking.user.name},

Your booking has been APPROVED.

Booking Details:

Facility: ${booking.facility}
Date: ${booking.date}
Slot: ${booking.slot}

Payment Method:
Cash / UPI / Paytm / PhonePe at Venue

Please arrive 10 minutes before your slot time.

Thank you for choosing Go Dash Sports.

— Team Go Dash`
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
  "❌ Go Dash Booking Rejected",
  `Hi ${booking.user.name},

Unfortunately your booking request could not be approved.

Booking Details:

Facility: ${booking.facility}
Date: ${booking.date}
Slot: ${booking.slot}

Please choose another available slot and try again.

Thank you for choosing Go Dash Sports.

— Team Go Dash`
);
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};