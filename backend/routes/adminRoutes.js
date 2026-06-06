const express = require("express");
const router = express.Router();
const {
  getAllBookings,
  approveBooking,
  rejectBooking,
} = require("../controllers/adminController");

router.get("/bookings", getAllBookings);
router.put("/approve/:id", approveBooking);
router.put("/reject/:id", rejectBooking);

module.exports = router;