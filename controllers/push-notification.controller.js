import webpush from 'web-push'
import PushNotificationSubscriptionModel from '../models/PushNotificationSubscriptionModel.js'

class SubscriptionController {
    static async saveSubscription (req,res) {
        try {
            // Check if subscription already exists
            const existingSubscription = await PushNotificationSubscriptionModel.findOne({ userId: req.body.userId })
            if (existingSubscription) {
                res.json({
                    success: false,
                    message: 'Subscription already exists'
                })
                return
            }

            const newSubscription = new PushNotificationSubscriptionModel(req.body)
            await newSubscription.save()
            res.json({
                success: true,
                message: 'Subscription saved successfully',
            })
        } catch(err) {
            res.json({
                success: false,
                message: `error: ${err}`
            })
            console.error(err)
        }
    }
    
    static async sendNotification (req,res) {
        const titleMessages = [
            '¡Cuidado con los pendientes! 📝',
            'Tienes tareas pendientes, no lo olvides 😮',
            '¡No olvides tus tareas! 😵‍💫',
            '¡Tienes tareas pendientes! 😱',
            '¡No olvides tus pendientes! 😨',
            '¡Tienes tareas por hacer! 😰',
            '¡No olvides tus tareas pendientes! 💀',
            '¡Tienes tareas pendientes! 😖',
        ]

        const payload = {
            notification: {
                title: titleMessages[Math.floor(Math.random() * titleMessages.length)],
                body: 'Recuerda revisar tus tareas pendientes',
                // icon: 'https://st3.depositphotos.com/3591429/13572/i/450/depositphotos_135721568-stock-photo-woman-writing-in-notebook.jpg',
                vibrate: [100, 50, 100],
                actions: [
                    {
                        action: 'explore',
                        title: 'Ir a la app'
                    }
                ]
            }
        }

        try {
            const token = await PushNotificationSubscriptionModel.findOne({ userId: req.body.userId }, { userId: 0, _id: 0, __v: 0 })
            console.log(token)
            console.log(JSON.stringify(payload))
            
            webpush.sendNotification(
                token,
                JSON.stringify(payload)
            ).then(response => {
                res.json({
                    success: true,
                    message: 'Notification sent successfully',
                    response
                })
            }).catch(error => {
                res.json({
                    success: false,
                    message: `error: ${error}`
                })
            })

        } catch(err) {
            res.json({
                success: false,
                message: `error catch: ${err}`
            })
        }
    }
}

export default SubscriptionController