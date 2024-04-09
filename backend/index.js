/**
 * This file controls the backend. It recieves HTTP requests,
 * and responds appropriately
 */

import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import productsRoute from './routes/productsRoute.js'
import cors from 'cors';
import twilio from 'twilio';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use('/products', productsRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to databse');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.post('/send-message', async (req, res) => {
  const accountSid = '<insert_own_accountSid>';
  const authToken = '<insert_own_authToken>';
  const client = twilio(accountSid, authToken);

  const { orderNumber, productName, deliveryDate, detailsString } = req.body;

  try {
    const message = await client.messages.create({
      from: 'whatsapp:<insert_own_TwilioNumber>',
      body: `Your ${orderNumber} order of ${productName} has shipped and should be delivered on ${deliveryDate}. Details: ${detailsString}`,
      to: 'whatsapp:<insert_own_Number>'
    });

    res.json({ sid: message.sid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  console.log(req)
  return res.status(200).send('<h1>Welcome to MERN</h1>')
});

