const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const ContenedorUser = require("../dao/daoUser");
let users = new ContenedorUser();

const bcrypt = require('bcrypt')

encryptPassword = async (password) =>{
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt)
	return hash
}

comparePassword = async (password, savedPassword) =>{
	return await bcrypt.compare(password, savedPassword)
}

passport.use(
  "local-login",
  new LocalStrategy(async function (username, password, done) {
    let user = await users.getUser(username);
		let pass = await comparePassword(password, user[0].password)

    if (pass) {
      return done(null, user);
    }
      return done(null, false);
  })
);

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const usr = await users.getUser(username)

      if (usr.username) {
        console.log("info", "el usuario ya existe");
        return done(done, false);
      } else {
        let user = {
          username: username,
          password: password,
        };
				user.password = await encryptPassword(password);
        users.save(user);
        console.log("info", "Usario creado!");
      }
      return done();
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  let usr = users.getUser(user);
  done(null, usr.username);
});

