import express from 'express';
import { engine } from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import usersRouter from './routes/users.router.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import passwordRouter from './routes/password.router.js';
import testRouter from './routes/tests.router.js';
import mocksRouter from './routes/mocks.router.js';
import { __dirname } from './utils.js';
import config from './config/config.js';
import passport from 'passport';
// Sessions -- mongo
// import session from 'express-session';
// import MongoStore from 'connect-mongo';

// Conección con db
import './config/db.config.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

// Cookies (temporalmente)
import cookieParser from 'cookie-parser';
import { logger } from './utils/logger.utils.js';
app.use(cookieParser());

//Passport
app.use(passport.initialize());

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
app.use('/api/password', passwordRouter);
app.use('/api/test', testRouter);
app.use('/api/mock', mocksRouter);

app.listen(config.PORT, () => {
  logger.info(`Servidor escuchando en el puerto ${config.PORT}`);
  logger.info(`Enviroment: ${config.ENVIROMENT}`);
});
