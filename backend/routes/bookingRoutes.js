const express =
require("express");

const router =
express.Router();

const {
 createBooking
}
=
require(
 "../controllers/bookingTemp"
);

const {
 protect
}
=
require(
 "../middleware/authMiddleware"
);

router.post(
 "/",
 protect,
 createBooking
);

module.exports =
router;