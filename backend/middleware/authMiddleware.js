const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {

 let token;

 if(
  req.headers.authorization &&
  req.headers.authorization.startsWith("Bearer")
 ){

  token =
  req.headers.authorization.split(" ")[1];

  try{

   const decoded =
   jwt.verify(
     token,
     process.env.JWT_SECRET
   );

   req.user = decoded;

   next();

  }catch(error){

   res.status(401);

   throw new Error("Unauthorized");

  }

 }

 if(!token){
  res.status(401);
  throw new Error("No Token");
 }

};

module.exports = { protect };