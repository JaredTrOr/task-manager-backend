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
                message: 'Usuario creado exitosamente',
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
                return res.json({ success: false, message: 'Email no existe' })

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

    // Functions that requires authentication
    static async profile(req, res) {
        try {
            const user = await UserModel.findById(req._id)
            if (!user) 
                return res.json({ success: false, message: 'Usuario no encontrado' })

            res.json({
                success: true, 
                message: 'El perfil se ha obtenido exitosamente',
                data: { 
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    image: user.image
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

    static async updateProfile(req, res) {
        try  {
            const userId = req._id

            const existingUsername = await UserModel.findOne({ username: req.body.username, _id: { $ne: userId } })
            if (existingUsername) return res.json({ success: false, message: 'El username ya existe, por favor de ingresar uno nuevo' })

            const existingEmail = await UserModel.findOne({ email: req.body.email, _id: { $ne: userId } })
            if (existingEmail) return res.json({ success: false, message: 'El email ya existe, por favor de ingresar uno nuevo' })

            const updatedUser =  await UserModel.findByIdAndUpdate(userId, req.body, { new: true })

            res.json({
                success: true, 
                message: 'Perfil actualizado exitosamente',
                data: updatedUser
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