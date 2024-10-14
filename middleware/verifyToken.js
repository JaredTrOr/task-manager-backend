import jwt from 'jsonwebtoken'

async function isAuth (req, res, next) {

    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ success: false, message: 'Unauthorized request' })
        }
    
        const token = req.headers.authorization.split(' ')[1]
    
        if (token === 'null') {
            return res.status(401).json({ success: false, message: 'Unauthorized request' })
        }
    
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!payload) {
            return res.status(401).json({ success: false, message: 'Unauthorized request' })
        }
    
        req._id = payload._id
        next()
    } catch(err) {
        console.log(err)
        return res.status(401).json({ success: false, message: 'Unauthorized request' })
    }
    

}
export default isAuth