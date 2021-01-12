const Route = require('../models/route');

exports.postAddRoute = (req,res,next) =>{
    console.log("==========BODY START==========");
    console.log(req.body);
    console.log("==========BODY STOP==========");
    console.log("==========FULL START==========");
    console.log(req);
    console.log("==========FULL STOP==========");
    const route = new Route({
        locations: req.body.locations
    });
    route.save().then(res =>{
        console.log(res);
        res.redirect('/');
    }).catch(err => {
        console.log(err);
    });
    res.send('OK');
}