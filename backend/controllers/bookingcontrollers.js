const Booking =
require("../models/Booking");

exports.createBooking =
async(req,res)=>{

 const booking =
 await Booking.create({

  user:req.user.id,

  facility:req.body.facility,

  date:req.body.date,

  slot:req.body.slot,

  amount:req.body.amount,

  advancePaid:req.body.advancePaid

 });

 res.status(201)
 .json(booking);

};