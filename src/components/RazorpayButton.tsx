"use client";

import axios from "axios";

export default function RazorpayButton() {

  const handlePayment = async () => {

    const { data } =
      await axios.post(
        "http://localhost:5000/api/payment/create-order",
        {
          amount: 180
        }
      );

    const options = {

      key:
      process.env.NEXT_PUBLIC_RAZORPAY_KEY,

      amount:
      data.amount,

      currency:
      "INR",

      order_id:
      data.id,

      name:
      "Go Dash",

      description:
      "Pickleball Booking",

      handler: function(response:any){

        alert(
         "Payment Successful"
        );

      }

    };

    const razor =
    new (window as any).Razorpay(
      options
    );

    razor.open();

  };

  return(

    <button
      onClick={handlePayment}
      className="bg-green-500 px-6 py-3 rounded"
    >
      Pay Advance ₹180
    </button>

  );
}