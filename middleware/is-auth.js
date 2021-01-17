// module.export = (req, res, next) => {
//   if (!res.session.isLoggedIn) {
//     return res.status("403").send({ message: "Authentication error" });
//   }
//   next();
// };

const jwt = require("jsonwebtoken");

const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
  let token = req.body.accessToken;

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};




module.exports = verifyToken;
