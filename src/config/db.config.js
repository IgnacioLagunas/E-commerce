import mongoose from 'mongoose';
import config from './config.js';
import { logger } from '../utils/logger.utils.js';

mongoose
  .connect(config.DB_URI)
  .then(() => {
    logger.info('Conectado a db');
  })
  .catch((e) => {
    logger.fatal('Error al conectar a db', e);
  });
