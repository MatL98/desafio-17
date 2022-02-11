const express = require("express");
const passport = require("passport");



const { Router } = express;
const router = new Router();


router.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/index.html",
    failureRedirect: "/login.html",
  })
);

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/login.html",
    failureRedirect: "/signup.html",
  })
);

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send("hay un error");
    } else {
      res.redirect("/login.html");
    }
  });
});

module.exports = router;
