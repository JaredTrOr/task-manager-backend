import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deadline: {
        type: Date
    },
    listType: {
        type: {
            title: {
                type: String,
                required: true
            },
            emoji: {
                type: String,
                required: true
            }
        },
        required: true
    },
    checked: {
        type: Boolean,
        required: true
    }
})

const TaskModel = mongoose.model('Task', TaskSchema)
export default TaskModel