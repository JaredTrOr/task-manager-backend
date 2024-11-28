import { Router } from "express"
import TaskController from "../../controllers/task.controller.js"

const taskRouter = Router()

taskRouter.get('/get-tasks', TaskController.getTasks)
taskRouter.get('/get-tasks-by-list-type/:listTypeId', TaskController.getTaskByListType)
taskRouter.post('/create-task', TaskController.createTask)
taskRouter.put('/update-task', TaskController.updateTask)
taskRouter.delete('/delete-task/:id', TaskController.deleteTask)
taskRouter.delete('/delete-completed-tasks', TaskController.deleteCompletedTasks)

export default taskRouter;