import mongoose from 'mongoose'

const PushNotificationSubscriptionSchema = new mongoose.Schema({
    endpoint: { type: String, required: true },
    expirationTime: { type: String },
    keys: {
        p256dh: { type: String, required: true },
        auth: { type: String, required: true },
    },
    userId: { type: String, required: true }
})

const PushNotificationSubscriptionModel = mongoose.model('PushNotificationSubscription', PushNotificationSubscriptionSchema)
export default PushNotificationSubscriptionModel