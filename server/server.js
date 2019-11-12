const express = require("express");
const jwt = require("jsonwebtoken");

const { validateToken } = require("./middlewares/jwt");

const app = express();

app.get("/generate-token", (req, res) => {
  jwt.sign(
    { data: "OBJECT" },
    process.env.SEED,
    { expiresIn: 60 * 60 },
    function(err, token) {
      console.log("Token", token);
      res.json({ authentication: token, message: "created" });
    }
  );
});

app.get("/validate-token", [validateToken], (req, res) => {
  console.log("Init validate-token");

  res.json({
    message: "validated"
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server Up, Listen Port: ", process.env.PORT);
});
