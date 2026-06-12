const express = require("express");
const bookingController = require("../controllers/bookingController")
const router = express.Router();
const {
  getAllBookings,
  approveBooking,
  rejectBooking,
  markPaymentPaid,
} = require("../controllers/adminController");

router.get("/bookings", getAllBookings);
router.get("/slot-stats", bookingController.getSlotStats);
router.put("/approve/:id", approveBooking);
router.put("/reject/:id", rejectBooking);
router.put("/payment-paid/:id", markPaymentPaid);

module.exports = router;