const { verify } = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.stackinflowToken;
    if (!token) return res.send("cookie not found");
    const decode = verify(token, process.env.JWT_SECRET);
    req.decoded = decode;
    next();
  } catch (error) {
    res.clearCookie("stackinflowToken").status(401).send("token expired");
    return false;
  }
};
