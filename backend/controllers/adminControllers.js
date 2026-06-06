const Booking =
require("../models/Booking");
const sendEmail = require("../utils/sendEmail");

exports.approveBooking = async (req, res) => {

  const booking = await Booking.findById(
    req.params.id
  );

  booking.bookingStatus = "approved";

  await booking.save();

  // Send Email
  await sendEmail(
    "customer@example.com",
    "Go Dash Booking Confirmed",
    `
Your booking has been confirmed.

Facility: ${booking.facility}
Date: ${booking.date}
Slot: ${booking.slot}

Thank you for choosing Go Dash.
    `
  );

  res.json(booking);

};

exports.rejectBooking =
async(req,res)=>{

 const booking =
 await Booking.findById(
  req.params.id
 );

 booking.bookingStatus =
 "rejected";

 await booking.save();

 res.json(booking);

};