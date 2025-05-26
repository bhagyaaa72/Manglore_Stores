// import express from 'express';  // const express = require('express');
// import dotenv from 'dotenv';
// import { connectDB } from './config/db.js';
// import SubCatRouter from "./Router/subcategoryRouter.js"
// import ProductRouter from "./Router/productRouter.js"
// import CatRouter from "./Router/categoryRouter.js"
// import UserRouter from "./Router/userRouter.js"
// import cors from "cors";
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import ContactusRouter from "./Router/contactusRouter.js"
// import nodemailer from "nodemailer";

// dotenv.config();

// const app=express();
// // Serve static files from the Images folder
// app.use("/Images", express.static(path.join(__dirname, "Images")));

// // This is how you recreate __dirname in ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const PORT = process.env.PORT || 5000;

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));


// app.use(express.json());//allow us to accept JSON data in the req.body

// app.use("/api", CatRouter);
// app.use("/api", ProductRouter);
// app.use("/api", SubCatRouter);
// app.use("/api", UserRouter);
// app.use("/api", ContactusRouter);
// app.use('/Backend/Images', express.static(path.join(__dirname, 'Images')));

// app.listen(PORT,() => {
//     connectDB();
//     console.log('Server started at http://localhost:'+ PORT);
// });

// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });
  
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: 'recipient@example.com',
//     subject: 'Test Email from Nodemailer',
//     text: 'Hello, this is a test email!',
//   };
  
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log('Error occurred:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });
  
//   transporter.verify((error, success) => {
//     if (error) {
//       console.error('Error verifying transporter:', error);
//     } else {
//       console.log('Nodemailer is ready for use');
//     }
//   });
  


import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import SubCatRouter from "./Router/subcategoryRouter.js";
import ProductRouter from "./Router/productRouter.js";
import CatRouter from "./Router/categoryRouter.js";
import UserRouter from "./Router/userRouter.js";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ContactusRouter from "./Router/contactusRouter.js";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

// ✅ Correct order: define __filename and __dirname BEFORE using them
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 5000;

// ✅ Enable CORS
app.use(cors({
  origin: "http://localhost:5173",  // Make sure this matches your frontend port
  credentials: true,
}));

app.use(express.json()); // Allow JSON body parsing

// ✅ Serve static files from Images folder correctly
app.use("/Images", express.static(path.join(__dirname, "Images")));

// ✅ API routes
app.use("/api", CatRouter);
app.use("/api", ProductRouter);
app.use("/api", SubCatRouter);
app.use("/api", UserRouter);
app.use("/api", ContactusRouter);

// ✅ Start server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});

// ✅ Nodemailer setup (unchanged)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: 'recipient@example.com',
  subject: 'Test Email from Nodemailer',
  text: 'Hello, this is a test email!',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error occurred:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error verifying transporter:', error);
  } else {
    console.log('Nodemailer is ready for use');
  }
});
