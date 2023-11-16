import express from 'express';
import { engine } from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import usersRouter from './routes/users.router.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import { __dirname } from './utils.js';
import passport from 'passport';
// Sessions -- mongo
import session from 'express-session';
import MongoStore from 'connect-mongo';

// Conección con db
import './db/configDB.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

// sessions - mongo connect
const URI =
  'mongodb+srv://IgnacioLagunas:ignacioLagunas@cluster0.tw5jc.mongodb.net/Coderhouse?retryWrites=true&w=majority';
app.use(
  session({
    store: new MongoStore({
      mongoUrl: URI,
    }),
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 120000 },
  })
);
//Passport
app.use(passport.initialize());
app.use(passport.session());

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

app.listen(8080, () => {
  console.log('Escuchando al puerto 8080...');
});
