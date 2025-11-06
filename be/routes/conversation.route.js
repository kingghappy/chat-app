import { Router } from 'express';
import * as cct from '../controllers/conversation.controller.js'
import authenticate from '../middlewares/authenticate.js';

const r = Router()

r.get('/:username',authenticate, cct.getConvController)

export default r