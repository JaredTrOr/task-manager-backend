import mongoose from "mongoose"

const ListTypeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    emoji: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    }
})

const ListTypeModel = mongoose.model('ListType', ListTypeSchema)
export default ListTypeModel