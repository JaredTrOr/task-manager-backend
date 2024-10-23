import { Router } from "express"
import ListTypeController from "../../controllers/list-type.controller.js"
const listTypeRouter = Router()

listTypeRouter.get('/get-list-types', ListTypeController.getListTypes)
listTypeRouter.post('/create-list-type', ListTypeController.createListType)
listTypeRouter.delete('/delete-list-type/:id', ListTypeController.deleteListType)

export default listTypeRouter;