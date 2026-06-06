require("dotenv").config();

const express =
require("express");

const cors =
require("cors");

const connectDB =
require("./config/db");

connectDB();

const app =
express();

app.use(cors());

app.use(express.json());

app.use(
 "/api/auth",
 require("./routes/authRoutes")
);

app.use(
 "/api/bookings",
 require("./routes/bookingRoutes")
);

app.use(
 "/api/admin",
 require("./routes/adminRoutes")
);

app.use(
 "/api/payment",
 require("./routes/paymentRoutes")
);

app.get("/",(req,res)=>{

 res.send(
 "Go Dash API Running"
 );

});

app.listen(
 process.env.PORT,
 ()=>{
  console.log(
   "Server Running"
  );
 }
);