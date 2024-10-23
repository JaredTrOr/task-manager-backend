import { Router } from "express"
import userRouter from "./api/user.route.js"
import taskRouter from "./api/task.route.js"
import listTypeRouter from "./api/list-type.route.js"
import isAuth from "../middlewares/verifyToken.js"

const router = Router()

router.get('/', (req,res) => res.json({message: 'Task manager sever running :3'}))
router.use('/user', userRouter)
router.use('/task',isAuth, taskRouter)
router.use('/list-type',isAuth, listTypeRouter)

export default router;