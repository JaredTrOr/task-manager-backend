import UserModel from "../models/UserModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

class UserController {

    static async signup(req, res) {
        try {
            const password = req.body.password
            const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS)
            req.body.password = hashedPassword

            const newUser = new UserModel(req.body)
            await newUser.save()

            const tokenPayload = {
                _id: newUser._id,
            }

            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, this.tokenConfig)
            res.status(200).json({
                success: true, 
                message: 'User created successfully',
                token
            })
        } catch(err) {      
            res.json({
                success: false, 
                message: err,
            })
        }      
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body

            const user = await UserModel.findOne({ email })
            if (!user) {
                res.json({ success: false, message: 'email does not exist' })
                return
            }

            const isValidPassword = bcrypt.compare(password, user.password)
            if (!isValidPassword) {
                res.json({ success: false, message: 'password is not valid' })
                return
            }

            const tokenPayload = {
                _id: user._id
            }

            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY)

            res.json({
                success: true, 
                message: 'Login successfully',
                token
            })
        } catch(err) {
            res.json({
                success: false, 
                message: err,
            })
        }
    }

}

export default UserController