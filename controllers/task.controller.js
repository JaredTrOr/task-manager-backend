import TaskModel from "../models/TaskModel.js";

class TaskController {

    static async getTasks (req,res) {
        try {
            const userId = req._id
            const tasks = await TaskModel.find({ creator: userId })
            res.json({
                success: true,
                data: tasks
            })
        } catch(err) {
            res.json({
                success: false,
                message: `error: ${err}`
            })
            console.error(err)
        }
    }

    static async getTaskByListType (req,res) {
        try {
            const userId = req._id
            const tasks = await TaskModel.find({ creator: userId, listType: req.params.listTypeId })
            res.json({
                success: true,
                data: tasks
            })
        } catch(err) {
            res.json({
                success: false,
                message: `error: ${err}`
            })
            console.error(err)
        }
    }

    static async createTask (req,res) {
        try {
            req.body.creator = req._id
            const newTask = new TaskModel(req.body)
            await newTask.save()
            res.json({
                success: true,
                message: 'La tarea se ha creado exitosamente',
                data: newTask
            })

        } catch(err) {
            res.json({
                success: false,
                message: `error: ${err}`
            })
            console.error(err);
        }
    }

    static async updateTask(req, res) {
        try {
            const updatedTask = await TaskModel.findByIdAndUpdate(req.body._id, req.body, { new: true })
            res.json({
                success: true,
                message: 'La tarea se ha actualizado exitosamente',
                data: updatedTask
            })
        } catch(err) {
            res.json({
                success: false,
                message: `error: ${err}`
            })
            console.error(err)
        }
    }

    static async deleteTask(req, res) {
        try {
            const deletedTask = await TaskModel.deleteOne({ _id: req.params.id })
            res.json({
                success: true,
                message: 'La tarea fue eliminada exitosamente',
                data: deletedTask
            })

        } catch(err) {
            res.json({
                success: false,
                message: `error: ${err}`
            })
            console.error(err)
        }
    }

    static async deleteCompletedTasks(req, res) {
        try {
            await TaskModel.deleteMany({ checked: true })
            res.json({
                success: true,
                message: 'Se han eliminado las tareas completadas',
            })
        } catch(err) {
            res.json({
                success: false,
                message: `error: ${err}`
            })
            console.error(err)
        }
    }

}

export default TaskController