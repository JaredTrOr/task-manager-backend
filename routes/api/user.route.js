import { Router } from "express"
import UserController from "../../controllers/user.controller.js"
import isAuth from "../../middlewares/verifyToken.js"
const userRouter = Router()

userRouter.post('/signup', UserController.signup)
userRouter.post('/login', UserController.login)
userRouter.get('/get-profile', isAuth ,UserController.profile)
userRouter.put('/update-profile', isAuth, UserController.updateProfile)

export default userRouter;