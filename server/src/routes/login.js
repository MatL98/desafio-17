const Router = require("koa-router")
const passport = require("passport");

const router = new Router({
  prefix: "/api/auth"
})

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

router.get("/logout", ctx => {
  ctx.session.destroy((err) => {
    if (err) {
      res.send("hay un error");
    } else {
      res.redirect("/login.html");
    }
  });
});

module.exports = router;
