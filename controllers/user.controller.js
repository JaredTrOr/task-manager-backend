import UserModel from "../models/UserModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

class UserController {

    static async signup(req, res) {
        try {

            const username = req.body.username;
            const email = req.body.email;

            if (await UserModel.findOne({ email })) 
                return res.json({ success: false, message: 'El email ya existe, por favor de ingresar uno nuevo' })

            if (await UserModel.findOne({ username }))
                return res.json({ success: false, message: 'El usuario ya existe, por favor de ingresar uno nuevo'})

            const password = req.body.password
            console.log()
            const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
            req.body.password = hashedPassword

            const newUser = new UserModel(req.body)
            await newUser.save()

            const tokenPayload = {
                _id: newUser._id,
            }

            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY)
            res.status(200).json({
                success: true, 
                message: 'User created successfully',
                data: {
                    user: newUser,
                    token
                }
            })
        } catch(err) {      
            res.json({
                success: false, 
                message: `error: ${err}`,
            })
            console.error(err);
        }      
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body

            const user = await UserModel.findOne({ email })
            if (!user) 
                return res.json({ success: false, message: 'Email ya existente' })

            const isValidPassword = bcrypt.compare(password, user.password)
            if (!isValidPassword) 
                return res.json({ success: false, message: 'Contraseña incorrecta' })

            const tokenPayload = {
                _id: user._id
            }

            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY)

            res.json({
                success: true, 
                message: 'Login successfully',
                data: {
                    user,
                    token
                }
            })
        } catch(err) {
            res.json({
                success: false, 
                message: `error: ${err}`,
            })
            console.error(err)
        }
    }

}

export default UserController