const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const generateToken = (id)=>{

 return jwt.sign(
 {
   id
 },
 process.env.JWT_SECRET,
 {
   expiresIn:"30d"
 });

};

exports.registerUser =
async(req,res)=>{

 const {
  name,
  password,
  phone
 } = req.body;

 const email = req.body.email
  .trim()
  .toLowerCase();

 const userExists =
 await User.findOne({email});

 if(userExists){

  return res.status(400)
  .json({
   message:"User Exists"
  });

 }

 const salt =
 await bcrypt.genSalt(10);

 const hashedPassword =
 await bcrypt.hash(
  password,
  salt
 );

 const user =
 await User.create({

  name,
  email,
  phone,
  password:hashedPassword

 });

 res.status(201).json({
  _id:user._id,
  token:generateToken(user._id)
 });

};

exports.loginUser = async (req, res) => {

  const password = req.body.password;

const email = req.body.email
  .trim()
  .toLowerCase();

  const user = await User.findOne({ email, });

  if (
    user &&
    (await bcrypt.compare(password, user.password))
  ) {

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });

  } else {

    res.status(401).json({
      message: "Invalid email or password"
    });

  }

};