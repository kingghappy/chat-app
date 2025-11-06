import { Router } from "express";
import * as mct from "../controllers/message.controller.js";
import authenticate from "./../middlewares/authenticate.js";

const r = Router();

r.post("/send/:convid", authenticate, mct.sendMessageController);

export default r;
