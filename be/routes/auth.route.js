import { Router } from "express";
import * as act from '../controllers/auth.controller.js'

const r = Router()

r.post('/signup', act.singupController)
r.post('/login', act.loginController)
r.post('/', act.logoutController)

export default r