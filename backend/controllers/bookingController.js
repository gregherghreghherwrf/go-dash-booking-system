const Booking = require("../models/Booking");
const sendEmail = require("../utils/sendEmail");

const ALL_SLOTS = [
  "4:00 PM - 4:30 PM",
  "4:30 PM - 5:00 PM",
  "5:00 PM - 5:30 PM",
  "5:30 PM - 6:00 PM",
  "6:00 PM - 6:30 PM",
  "6:30 PM - 7:00 PM",
  "7:00 PM - 7:30 PM",
  "7:30 PM - 8:00 PM",
  "8:00 PM - 8:30 PM",
  "8:30 PM - 9:00 PM",
  "9:00 PM - 9:30 PM",
  "9:30 PM - 10:00 PM",
  "10:00 PM - 10:30 PM",
  "10:30 PM - 11:00 PM",
  "11:00 PM - 11:30 PM",
  "11:30 PM - 12:00 AM",
  "12:00 AM - 12:30 AM",
  "12:30 AM - 1:00 AM",
];

exports.createBooking = async (req, res) => {
  try {
    console.log("BOOKING REQUEST");
    console.log(req.body);
    
    const {
    facility,
    date,
    slot,
    duration,
    amount,
    name,
    email,
    mobile,
    
   } = req.body;

    // Check if slot is already booked and approved
    const bookingCount = await Booking.countDocuments({
      facility,
      date,
      slot,
      bookingStatus: { $in: ["pending", "approved"] },
    });

    const FACILITY_CAPACITY = {
  Pickleball: 6,
  "Box Cricket": 2,
};

    if (
  bookingCount >= FACILITY_CAPACITY[facility]
) {
  return res.status(409).json({
    message: "All courts are booked for this slot",
  });
}

    const booking = await Booking.create({
      facility,
      date,
      slot,
      duration,
      amount,
      name,
      email,
      mobile,
      
      paymentStatus: "pending",
      bookingStatus: "pending",
    });

//       await sendEmail(
//   email,
//   "Go Dash Booking Request Received",
//   `
// Hello ${name},

// We have received your booking request.

// Facility: ${facility}
// Date: ${date}
// Slot: ${slot}

// Status: Pending Approval

// You will receive another email once the admin approves your booking.

// Payment can be made by Cash, UPI, Paytm or PhonePe when you arrive.

// Thank you for choosing Go Dash Sports.
// `
// );

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAvailableSlots = async (req, res) => {
  try {
    const { facility, date } = req.query;

   const FACILITY_CAPACITY = {
  Pickleball: 6,
  "Box Cricket": 2,
};

const available = await Promise.all(
  ALL_SLOTS.map(async (slot) => {
    const bookingCount = await Booking.countDocuments({
      facility,
      date,
      slot,
      bookingStatus: { $in: ["pending", "approved"] },
    });

    return {
      slot,
      available: bookingCount < FACILITY_CAPACITY[facility],
      booked: bookingCount,
      remaining: FACILITY_CAPACITY[facility] - bookingCount,
    };
  })
);

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

exports.getSlotStats = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const result = await Promise.all(
      ALL_SLOTS.map(async (slot) => {
        const pickleballBooked = await Booking.countDocuments({
          facility: "Pickleball",
          date: today,
          slot,
          bookingStatus: { $in: ["pending", "approved"] },
        });

        const boxBooked = await Booking.countDocuments({
          facility: "Box Cricket",
          date: today,
          slot,
          bookingStatus: { $in: ["pending", "approved"] },
        });

        return {
          slot,

          pickleballBooked,
          pickleballAvailable: 6 - pickleballBooked,

          boxBooked,
          boxAvailable: 2 - boxBooked,
        };
      })
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};