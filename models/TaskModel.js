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
        type: String,
        required: true
    },
    reminder: {
        unitTime: { type: String },
        amount: { type: Number }
    },
    checked: {
        type: Boolean,
        required: true
    },
    creator: {
        type: String,
        required: true
    }
})

const TaskModel = mongoose.model('Task', TaskSchema)
export default TaskModel