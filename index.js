import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes/router.js'
import webpush from 'web-push'
import { connectToMongoDB } from './db/connection.js'
import scheduleReminders from './services/notificationService.js'

dotenv.config()
const PORT = process.env.PORT
const app = express()
connectToMongoDB()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', router)

webpush.setVapidDetails(
    'mailto:trujillojaredalexander@gmail.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
)

// scheduleReminders()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})