module.export = (req, res, next) => {
  if (!res.session.isLoggedIn) {
    return res.status("403").send({ message: "Authentication error" });
  }
  next();
};
