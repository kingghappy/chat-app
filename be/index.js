import express from "express";
import cookieParser from "cookie-parser";



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