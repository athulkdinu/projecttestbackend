const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  console.log("inside jwtMiddleware");

  try {
    //  check header exists
    if (!req.headers.authorization) {
      return res.status(401).json("Authorization header missing");
    }

    //  extract token (Bearer <token>)
    const token = req.headers.authorization.split(" ")[1];
    console.log("Token:", token);

    if (!token) {
      return res.status(401).json("Token missing");
    }

    //  verify token
    const jwtResponse = jwt.verify(token, process.env.JWT_SECRET);
    console.log("JWT Response:", jwtResponse);

    //  attach payload to request
    req.payload = jwtResponse.userId || jwtResponse.userMail;

    // Store full decoded token for userId access
    req.user = {
      userId: jwtResponse.userId,
      email: jwtResponse.email
    };

    //  allow request
    next();
  } catch (err) {
    return res.status(401).json("Invalid or expired token");
  }
};

module.exports = jwtMiddleware;

