const path = require("path");

const express = require("express");

const pathController = require("../controllers/path");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.post("/addRoute", [isAuth], pathController.postAddRoute);

router.post("/myRoutes", [isAuth], pathController.getMyRoutes);

router.post("/details/:id", [isAuth], pathController.getDetails);

module.exports = router;
