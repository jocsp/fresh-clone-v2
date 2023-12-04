const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    console.log("no token");
    return res
      .status(401)
      .json({ authorized: false, error: "No authorized to make that request" });
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

module.exports = { requireAuth };
