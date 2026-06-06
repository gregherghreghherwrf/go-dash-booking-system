const express =
require("express");

const router =
express.Router();

const {
 approveBooking,
 rejectBooking
}
=
require(
 "../controllers/adminController"
);

router.put(
 "/approve/:id",
 approveBooking
);

router.put(
 "/reject/:id",
 rejectBooking
);

module.exports = router;