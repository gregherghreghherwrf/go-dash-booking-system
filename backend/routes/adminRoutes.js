const express = require("express");
const bookingController = require("../controllers/bookingController")
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  getAllBookings,
  approveBooking,
  rejectBooking,
  markPaymentPaid,
} = require("../controllers/adminController");
const auth = require("../middleware/auth");

router.get("/bookings", auth,getAllBookings);
router.get("/slot-stats", auth,bookingController.getSlotStats);
router.put("/approve/:id", auth,approveBooking);
router.put("/reject/:id", auth, rejectBooking);
router.put("/payment-paid/:id", auth,markPaymentPaid);

router.post("/login", async (req, res) => {
  try {
    const email = (req.body.email || "").trim().toLowerCase();
    const password = (req.body.password || "").trim();

    const adminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    const adminPassword = (process.env.ADMIN_PASSWORD || "").trim();

    if (email !== adminEmail || password !== adminPassword) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        role: "admin",
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;