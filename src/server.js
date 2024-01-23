import express from 'express';
import { engine } from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import usersRouter from './routes/users.router.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import { __dirname } from './utils.js';
import config from './config/config.js';
import passport from 'passport';
// Sessions -- mongo
// import session from 'express-session';
// import MongoStore from 'connect-mongo';

// Conección con db
import './config/config.db.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

// Cookies (temporalmente)
import cookieParser from 'cookie-parser';
app.use(cookieParser());

// sessions - mongo connect

// app.use(
//   session({
//     store: new MongoStore({
//       mongoUrl: config.DB_URI,
//     }),
//     secret: config.DB_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 1200000 },
//   })
// );
//Passport
app.use(passport.initialize());
// app.use(passport.session());

//Handlebars
app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);
app.use('/api/users', usersRouter);
app.use('/api/sessions', sessionsRouter);

app.listen(config.PORT, () => {
  console.log('Escuchando al puerto 8080...');
});
