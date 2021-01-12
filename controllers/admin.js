const Route = require('../models/route');

exports.postAddRoute = (req,res,next) =>{
    console.log("====================");
    console.log(req.body);
    console.log("====================");
    const route = new Route({
        locations: req.body.locations
    });
    route.save().then(res =>{
        console.log(res);
        res.redirect('/');
    }).catch(err => {
        console.log(err);
    })
}