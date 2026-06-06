const express =
require("express");

const router =
express.Router();

const {
 createBooking
}
=
require(
 "../controllers/bookingControllers"
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