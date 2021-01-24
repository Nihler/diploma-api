const Route = require("../models/path");
const { route } = require("../routes/path");
//const User = require("../models/user");

exports.postAddRoute = (req, res, next) => {
  const locations = req.body.locations;
  const userId = req.body.userId;
  const runStart = req.body.runStart;
  const runStop = req.body.runStop;
  const distance = req.body.distance;
  const route = new Route({
    locations: locations,
    userId: userId,
    runStart: runStart,
    runStop: runStop,
    distance: distance
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

exports.getMyRoutes = (req, res, next) => {
  const userId = req.body.userId;
  Route.find({ userId: userId }, 'runStart runStop')
    .then((paths) => {
      res.status("200").send(paths);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getDetails = (req, res, next) => {
  const routeId = req.params.id;
  console.log(routeId);
  Route.findById(routeId).then(resData =>{
    console.log(resData);
    res.status('200').send(resData);
  }).catch(err =>{
    console.log(err);
    res.status('400').send({message: "WRONG_ROUTE_ID"});
  })
  return true;
}