const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const jwt = require('jsonwebtoken');

const User = require("../models/user");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  User.findOne({ email: email }).then((user) => {
    console.log(user);
    if (!user)
      return res
        .status("400")
        .send({ message: "INCORRECT_CREDENTIALS" });
    bcrypt
      .compare(password, user.password)
      .then((doMatch) => {
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          const token = jwt.sign({id: user.userId}, config.secret, { 
            expiresIn: 86400
          });
          //req.session.token = 
          return req.session.save((result) => {
            res.status("202").send({
              id: user.userId,
              accessToken: token,
              email: user.email,
              username: user.username,
              expiresIn: 86400
            });
          });
        }
        res
          .status("400")
          .send({ message: "INCORRECT_CREDENTIALS" });
      })
      .catch((err) => {
        console.log(err);
        res
          .status("400")
          .send({ message: "INCORRECT_CREDENTIALS" });
      });
  });
};

exports.postSignup = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  console.log("Step 1");
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        console.log("Step 2");
        return res
          .status("400")
          .send({ message: "EMAIL_EXISTS" });
      }
      return bcrypt.hash(password, 12).then((hashedPassword) => {
        console.log("Step 2");
        const user = new User({
          username: username,
          password: hashedPassword,
          email: email,
          isActive: false,
          registerDate: Date.now(),
          lastActivity: Date.now()
        });
        return user
          .save()
          .then((result) => {
            console.log(result);
            res.status("201").send({ message: "USER_CREATED" });
            return transporter.sendMail({
              to: email,
              from: "gj41360@zut.edu.pl",
              subject: "You just signup",
              html: "<h1>You successfully signed up!</h1>",
            }).catch(err =>{
              console.log(err);
            });
          })
          .catch((err) =>
            res
              .status("400")
              .send({ message: "User with this email already exists!" })
          );
      });
    })
    .catch((err) => {
      console.log(err);
      res.status("400").send({ message: "INCORRECT_CREDENTIALS" });
    });
};

exports.postResetPassword = (req, res, next) =>{

}


exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.status("200").send({ isLoggedIn: false });
  });
};
