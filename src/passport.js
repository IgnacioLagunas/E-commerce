import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as LocalStrategy } from 'passport-local';
import UsersService from './services/users.service.js';
import { createHash, isPasswordValid } from './utils.js';
import config from './config/config.js';

// Estrategia local

passport.use(
  'login',
  new LocalStrategy(
    { usernameField: 'email' },
    async (username, password, done) => {
      try {
        const user = await UsersService.findOneByEmail(username);
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }
        // Logica de verificacion de password
        if (!isPasswordValid(user, password)) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  'signup',
  new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email' },
    async (req, username, password, done) => {
      const { first_name, last_name } = req.body;
      if ((!first_name, !last_name, !username, !password)) {
        return done(null, false, { message: 'Faltan datos por llenar' });
      }
      try {
        const user = await UsersService.findOneByEmail(username);
        if (user) {
          return done(null, false, {
            message: `Ya existe un usuario registrado con el mail ${username}`,
          });
        }
        // Logica de hasheo de password //////
        const newUser = await UsersService.createOne({
          first_name,
          last_name,
          email: username.toLowerCase(),
          password: createHash(password),
        });
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Google - passport

passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8080/api/sessions/auth/google/callback',
    },
    async function (accessToken, refreshToken, profile, done) {
      // Al resolver el callback, si todo sale bien con google se implementa esta logica
      const { _json: googleUser } = profile;
      try {
        const userInDB = await UsersService.findOneByEmail(googleUser.email);
        console.log('aca');
        if (!userInDB) {
          const {
            given_name: first_name,
            family_name: last_name,
            email,
          } = googleUser;
          const newUser = await UsersService.createOne({
            first_name,
            last_name,
            email: email.toLowerCase(),
            // origin: 'GOOGLE',
          });
          done(null, newUser);
        } else done(null, userInDB);
      } catch (error) {
        done(error);
      }
    }
  )
);

// GitHub-Passport Strategy

passport.use(
  'github',
  new GitHubStrategy(
    {
      clientID: config.GITHUB_CLIENT_ID,
      clientSecret: config.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:8080/api/sessions/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log({ profile });
      const { displayName: name, emails } = profile;
      if (!emails || emails.length == 0) {
        return done(null, null, {
          message:
            'Email no encontrado. Por favor revise su configuración de github para permitir a la app la recuperación de email o intente registrarse mediante otro método!',
        });
      }
      const email = emails[0].value;
      try {
        const user = await UsersService.findOneByEmail(email);
        if (!user) {
          const [first_name, last_name] = name.split(' ');
          console.log({ first_name, last_name });
          const newUser = await UsersService.createOne({
            first_name,
            last_name,
            email,
          });
          return done(null, newUser);
        } else return done(null, user);
      } catch (error) {
        done(error);
      }
      // console.log({ profile });
    }
  )
);

// JWT-Passport

// const SECRET_KEY_JWT = 'secretoooo';

// passport.use(
//   'jwt',
//   new JWTStrategy(
//     {
//       // De donde se extrae el token
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
//       secretOrKey: SECRET_KEY_JWT,
//     },
//     (jwt_payload, done) => {

//     }
//   )
// );

// Toma el usuario retornado por las estrategias de passport y guarda el email en req.session.passport.user
passport.serializeUser(function (user, done) {
  done(null, user._id);
});

//
passport.deserializeUser(async (id, done) => {
  try {
    const user = await UsersService.findOne(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
