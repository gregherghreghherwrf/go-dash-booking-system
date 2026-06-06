exports.loginUser =
async(req,res)=>{

 const {
  email,
  password
 } = req.body;

 const user =
 await User.findOne({email});

 if(
  user &&
  await bcrypt.compare(
   password,
   user.password
  )
 ){

  res.json({

   _id:user._id,

   token:
   generateToken(user._id),

   role:user.role

  });

 }else{

  res.status(401)
  .json({
   message:"Invalid Credentials"
  });

 }

};