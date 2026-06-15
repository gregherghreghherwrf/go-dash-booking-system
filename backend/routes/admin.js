const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({
    email,
  });

  if (!admin)
    return res
      .status(401)
      .json({ message: "Invalid login" });

  const valid = await bcrypt.compare(
    password,
    admin.password
  );

  if (!valid)
    return res
      .status(401)
      .json({ message: "Invalid login" });

  const token = jwt.sign(
    {
      adminId: admin._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.json({ token });
});

module.exports = router;