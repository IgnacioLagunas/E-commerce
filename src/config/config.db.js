import mongoose from 'mongoose';
import config from './config.js';

mongoose
  .connect(config.DB_URI)
  .then(() => {
    console.log('Conectado a db');
  })
  .catch((e) => {
    console.log(e);
  });
