const express = require("express");
const router = express.Router();
const {
  createBooking,
  getAvailableSlots,
  getMyBookings,
  getStats,
} = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", createBooking);
router.get("/available-slots", getAvailableSlots);
router.get("/my-bookings", protect, getMyBookings);
router.get("/stats", getStats);

module.exports = router;