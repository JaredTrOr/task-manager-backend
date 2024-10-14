import mongoose from 'mongoose'

export function connectToMongoDB() {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connection to mongodb successfully')
    })
    .catch(err => {
        console.log(`Error connecting to mongodb database: ${err}`)
    })
}

