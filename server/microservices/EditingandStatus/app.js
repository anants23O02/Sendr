const http=require("http")
require('dotenv').config();
const express=require('express');
const cors=require('cors')
const app=express();
const server=http.createServer(app);
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies (if needed for other parts of your app)
app.use(express.json());
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// const twilio = require('twilio');
// const client = twilio('AC8e39dfd04e154ae0512fffa5ef0bff3d', '0f366bc8cd5dd52f6985b4f202e97726');

// client.messages
//   .create({
//     body: 'Hello from twillio!',
//     from: '+13203993463',  // Your Twilio number
//     to: '+919621572155'     // Recipient's number
//   })
//   .then(message => console.log(message.sid));
//   client.messages('SM9638a0ce9289b90f55dddc70536cb063')
//   .fetch()
//   .then(message => console.log(message.status));


// async function main() {
//   const messages = await prisma.message.findMany({
//     where: {
//       senderId: 1, // example condition
//     },
//     include: {
//       // You can also include related user, etc.
//     },
//   });
//   //const data=JSON.parse(messages);
  
//   console.log('📨 Messages:', messages[0].message);
// }

const messageRoutes=require('./routes/messageRoutes');
const twillioRoutes=require('./routes/twillioRoutes');

app.use('/message',messageRoutes);
//creating twillio api for messaging and status
app.use('/twillio',twillioRoutes);

// main()
//   .catch(console.error)
//   .finally(() => prisma.$disconnect());
//middleware

app.use(express.json());


const port=5000;
server.listen(port,()=>{
    console.log("server connnected")
})