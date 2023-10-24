import mongoose from 'mongoose';

const URI =
  'mongodb+srv://IgnacioLagunas:ignacioLagunas@cluster0.tw5jc.mongodb.net/Coderhouse?retryWrites=true&w=majority';

mongoose
  .connect(URI)
  .then(() => {
    console.log('Conectado a db');
  })
  .catch((e) => {
    console.log(e);
  });
