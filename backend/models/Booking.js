const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    facility: {
      type: String,
      required: true,
    },

    name: String,

    mobile: String,

    date: {
      type: String,
      required: true,
    },

    slot: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    duration: {
  type: Number,
  default: 30,
},

    amount: Number,

    advancePaid: Number,

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    paymentId: String,

    orderId: String,

    bookingStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);