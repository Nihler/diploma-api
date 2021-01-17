const Route = require("../models/path");
//const User = require("../models/user");

exports.postAddRoute = (req, res, next) => {
  const locations = req.body.locations;
  const userId = req.body.userId;
  const runStart = req.body.runStart;
  const runStop = req.body.runStop;
  const route = new Route({
    locations: req.body.locations,
    userId: userId,
    runStart: runStart,
    runStop: runStop,
  });
  console.log(route);
  route
    .save()
    .then((res) => {
      console.log(res);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
  res.status("500");
};

exports.postMyRoutes = (req, res, next) => {
  const userId = req.body.userId;
  Route.find({ userId: userId })
    .then((paths) => {
      res.status("200").send(paths);
    })
    .catch((err) => {
      console.log(err);
    });
};
