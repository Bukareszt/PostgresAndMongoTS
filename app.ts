import express from 'express';
import prepareServer from './utills/prepareServer';
import dotenv from 'dotenv';

dotenv.config();

const port = 3000;

function onInit() {
  const app = express();

  prepareServer(app);

  app.listen(port, () => {
    console.log('I wake up!');
  });
}

onInit();
