require("../config/config");

const jwt = require("jsonwebtoken");

// ---------------------
// Validate Token
// ---------------------
let validateToken = (req, res, next) => {
  console.log("Init middleware validate-token");

  let token = req.get("Authentication");

  console.log("token:", token)

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: "Token no válido"
        }
      });
    }

    next();
  });
};

module.exports = { validateToken };
