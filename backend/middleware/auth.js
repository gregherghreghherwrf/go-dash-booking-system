const jwt = require("jsonwebtoken");

module.exports = (
  req,
  res,
  next
) => {
  const auth =
    req.headers.authorization;

  if (!auth)
    return res
      .status(401)
      .json({
        message: "Unauthorized",
      });

  const token = auth.split(" ")[1];

  try {
    jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    next();
  } catch {
    return res
      .status(401)
      .json({
        message: "Unauthorized",
      });
  }
};