import express from "express";


import { config } from "dotenv";
import connDb from "./db/connDb.js";

config()

const app = express()

app.use(express.json())

app.get("/healthz", (req, res) => res.json({oke: true}))




const PORT = process.env.PORT || 3000 

connDb()
app.listen(PORT, (
    console.log("Server running at port ", PORT)
))