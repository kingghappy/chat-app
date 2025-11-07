import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'


import { config } from "dotenv";
import connDb from "./db/connDb.js";

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import convRouter from './routes/conversation.route.js'
import messageRouter from './routes/message.route.js'

config()

const app = express()

app.use(cookieParser());
app.use(express.json())

const whitelist = [
  'http://localhost:5173'              // Domain development
];

const corsOptions = {
  origin: function (origin, callback) {
    //
    // 'origin' là nguồn gửi request (ví dụ: http://localhost:3000)
    // Nếu request không có 'origin' (như Postman), cũng cho phép
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Cho phép
    } else {
      callback(new Error('Không được phép bởi CORS')); // Từ chối
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Các phương thức cho phép
  credentials: true, // Cho phép gửi cookie (nếu có)
  optionsSuccessStatus: 200 // Trả về status 200 cho request OPTIONS
};

// Sử dụng cors với optionsJ
app.use(cors(corsOptions));

app.get("/healthz", (req, res) => res.json({oke: true}))

app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/conv', convRouter)
app.use('/message', messageRouter)


const PORT = process.env.PORT || 3000 

connDb()
app.listen(PORT, (
    console.log("Server running at port ", PORT)
))