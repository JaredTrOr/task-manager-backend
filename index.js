import express from 'express'
import dotenv from 'dotenv'
import router from './routes/router.js'
import { connectToMongoDB } from './db/connection.js'

dotenv.config()
const PORT = process.env.PORT
const app = express()
connectToMongoDB()

app.use(express.json())
app.use('/', router)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})