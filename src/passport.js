import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import UsersManager from './managers/UsersManager.js';

const Users = new UsersManager();

// Google - passport

const GOOGLE_CLIENT_ID =
  '282153551748-4sj4od3lgrmbsf32690cdt3is3s0ti32.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8080/api/sessions/auth/google/callback',
    },
    async function (accessToken, refreshToken, profile, done) {
      // Al resolver el callback, si todo sale bien con google se implementa esta logica
      const { _json: user } = profile;
      try {
        const userInDB = await Users.findUserByEmail(user.email);
        if (!userInDB) {
          const {
            given_name: first_name,
            family_name: last_name,
            email,
          } = user;
          const newUser = await Users.createOne({
            first_name,
            last_name,
            email,
            origin: 'GOOGLE',
          });
          done(null, newUser);
        } else done(null, userInDB);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Toma el usuario retornado por las estrategias de passport y guarda el email en req.session.passport.user
passport.serializeUser(function (user, done) {
  console.log({ user });
  done(null, user.email);
});

//
passport.deserializeUser(async function (email, done) {
  try {
    const user = await Users.findUserByEmail(email);
    if (!user) done(null, null, 'Usuario no encontrado');
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// const { first_name, last_name, email, password } = req.body;
//   if ((!first_name, !last_name, !email, !password)) {
//     return res.status(400).json({ message: 'missing data' });
//   }
//   try {
//     const user = await usersManager.findUserByEmail(email);
//     if (user) return res.redirect('/login');
//     const role = email == 'adminCoder@coder.com' ? 'admin' : 'user';
//     await usersManager.createOne({
//       ...req.body,
//       role,
//       origin: 'NONE',
//     });
//     // -- Con sessions --
//     // req.session.user = { email, first_name, last_name, role };

//     // -- Con jwt --
//     const token = generateToken({ email, first_name, last_name });
//     res.json('token', token);

export default passport;
