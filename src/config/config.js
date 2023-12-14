import dotenv from 'dotenv';

dotenv.config();

export default {
  DB_URI: process.env.DB_URI,
  DB_SECRET: process.env.DB_SECRET,

  PORT: process.env.PORT,
  SECRET_KEY_JWT: process.env.SECRET_KEY_JWT,

  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};
