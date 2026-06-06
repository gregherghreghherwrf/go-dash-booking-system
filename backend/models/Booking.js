const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
{
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  facility:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Facility"
  },

  date:String,

  slot:String,

  amount:Number,

  advancePaid:Number,

  paymentStatus:{
    type:String,
    default:"pending"
  },

  bookingStatus:{
    type:String,
    enum:[
      "pending",
      "approved",
      "rejected"
    ],
    default:"pending"
  }
},
{
 timestamps:true
}
);

module.exports =
mongoose.model(
"Booking",
bookingSchema
);