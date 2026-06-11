const Booking = require("../models/Booking");
const sendEmail = require("../utils/sendEmail");

const ALL_SLOTS = [
  "6:00 AM - 7:00 AM",
  "7:00 AM - 8:00 AM",
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
  "6:00 PM - 7:00 PM",
  "7:00 PM - 8:00 PM",
  "8:00 PM - 9:00 PM",
  "9:00 PM - 10:00 PM",
];

exports.createBooking = async (req, res) => {
  try {
    const {
    facility,
    date,
    slot,
    amount,
    name,
    email,
    mobile,
    
   } = req.body;

    // Check if slot is already booked and approved
    const conflict = await Booking.findOne({
      facility,
      date,
      slot,
      bookingStatus: { $in: ["pending", "approved"] },
    });

    if (conflict) {
      return res.status(409).json({ message: "Slot already booked" });
    }

    const booking = await Booking.create({
      facility,
      date,
      slot,
      amount,
      name,
      email,
      mobile,
      
      paymentStatus: "pending",
      bookingStatus: "pending",
    });

      await sendEmail(
  email,
  "Go Dash Booking Request Received",
  `
Hello ${name},

We have received your booking request.

Facility: ${facility}
Date: ${date}
Slot: ${slot}

Status: Pending Approval

You will receive another email once the admin approves your booking.

Payment can be made by Cash, UPI, Paytm or PhonePe when you arrive.

Thank you for choosing Go Dash Sports.
`
);

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAvailableSlots = async (req, res) => {
  try {
    const { facility, date } = req.query;

    const booked = await Booking.find({
      facility,
      date,
      bookingStatus: { $in: ["pending", "approved"] },
    }).select("slot");

    const bookedSlots = booked.map((b) => b.slot);
    const available = ALL_SLOTS.map((slot) => ({
      slot,
      available: !bookedSlots.includes(slot),
    }));

    res.json(available);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const totalBookings = await Booking.countDocuments();
    const todayBookings = await Booking.countDocuments({ date: today });
    const pending = await Booking.countDocuments({ bookingStatus: "pending" });
    const approved = await Booking.countDocuments({ bookingStatus: "approved" });

    const revenueResult = await Booking.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$advancePaid" } } },
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    const todayRevenueResult = await Booking.aggregate([
      { $match: { paymentStatus: "paid", date: today } },
      { $group: { _id: null, total: { $sum: "$advancePaid" } } },
    ]);
    const todayRevenue = todayRevenueResult[0]?.total || 0;

    res.json({
      totalBookings,
      todayBookings,
      pending,
      approved,
      totalRevenue,
      todayRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};