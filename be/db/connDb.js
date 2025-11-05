import mongoose from "mongoose";
import { config } from "dotenv";

config();

const connDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connect to db success !!");

  } catch (error) {
    console.log(error.message);
  }
};

export default connDb;
