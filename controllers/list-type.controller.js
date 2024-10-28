import ListTypeModel from '../models/ListTypeModel.js'

class ListTypeController {

    static async getListTypes (req, res) {
        try {
            const userId = req._id
            const listTypes = await ListTypeModel.find({ creator: userId })
            res.json({
                success: true,
                message: 'List types obtenidos exitosamente',
                data: listTypes
            })
        } catch(err) {
            res.json({
                success: false,
                message: `error: ${err}`
            })
            console.error(err)
        }
    }

    static async createListType (req, res) {
        try {
            req.body.creator = req._id
            const newListType = new ListTypeModel(req.body)
            await newListType.save()
            res.json({
                success: true,
                message: 'La lista se inserto exitosamente',
                data: newListType
            })
        } catch(err) {
            res.json({
                success: false,
                message: `error: ${err}`
            })
            console.error(err)
        }
    }

    static async deleteListType (req, res) {
        try {
            const listType = await ListTypeModel.deleteOne({ _id: req.params.id })
            res.json({
                success: true,
                message: 'El list type fue eliminado exitosamente',
                data: listType
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

export default ListTypeController