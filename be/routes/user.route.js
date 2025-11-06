import {Router} from "express"
import * as mod from '../controllers/user.controller.js'

const r  = Router()

r.patch('/change-pass', mod.changPassController)

export default r