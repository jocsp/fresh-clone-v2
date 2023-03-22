const jwt = require("jsonwebtoken");

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next();
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.body._id = _id;
    next();
  } catch (error) {
    console.log("error verifying token in Check User", error);
    next();
  }
};

module.exports = { checkUser };
