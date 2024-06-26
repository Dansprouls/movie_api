const jwtSecret = "your_jwt_secret"; // This has to be the same key used in the JWTStrategy

const jwt = require("jsonwebtoken"),
    passport = require("passport");

require("./passport"); // Your local passport file

/**
 * @param {string} user
 * @returns {*} jwtsecret
 * this will return a randomized token for the user that will expire in 7 days.
 *
 */
let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.username, // This is the username you’re encoding in the JWT
        expiresIn: "7d", // This specifies that the token will expire in 7 days
        algorithm: "HS256", // This is the algorithm used to “sign” or encode the values of the JWT
    });
};

/**
 *
 * @param {*} router
 * @returns {*} user,jwtsecret
 * this will create a token once the user has created an account and trying to log in.
 */
/* POST login. */
module.exports = (router) => {
    router.use(passport.initialize()); //added in
    router.post("/login", (req, res) => {
        passport.authenticate(
            "local",
            { session: false },
            (error, user, info) => {
                if (error || !user) {
                    return res.status(400).json({
                        message: "Something is not right",
                        user: user,
                    });
                }
                req.login(user, { session: false }, (error) => {
                    if (error) {
                        res.send(error);
                    }
                    let token = generateJWTToken(user.toJSON());
                    return res.json({ user, token });
                });
            }
        )(req, res);
    });
};

//Gerrit's code
/*
const jwtSecret = 'your_jwt_secret'; // This has to be the same key used in the JWTStrategy

const jwt = require('jsonwebtoken'),
  passport = require('passport');

require('./passport'); // Your local passport file

let generateJWTToken = (user) => {
  console.log('generate', user)
  return jwt.sign({user}, jwtSecret, {expiresIn: 604800});
}



module.exports = (router) => {
  router.post('/login', (req, res) => {
    console.log(req.body)
    passport.authenticate('local', { session: false }, (user, error) => {
      console.log('auth: ', error, user)
      if (error || !user) {
        return res.status(400).json({
          message: error,
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user);
        return res.json({ user, token });
      });
    })(req, res);
  });
}
*/

// ASYNC AWAIT GENERATOR
/*
const jwtSecret = 'your_jwt_secret'; // This has to be the same key used in the JWTStrategy

const jwt = require('jsonwebtoken'),
  passport = require('passport');

require('./passport'); // Your local passport file


let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.username, // This is the username you’re encoding in the JWT
    expiresIn: '7d', // This specifies that the token will expire in 7 days
    algorithm: 'HS256' // This is the algorithm used to “sign” or encode the values of the JWT
  });
}



module.exports = (router) => {
  router.post('/login', async (req, res) => {
    try {
      const { user } = await passport.authenticate('local', { session: false });
      if (!user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, { session: false });
      let token = generateJWTToken(user.toJSON());
      return res.json({ user, token });
    } catch (error) {
      res.send(error);
    }
  });
}
*/
