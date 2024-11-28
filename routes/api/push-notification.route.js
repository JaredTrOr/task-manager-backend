import { Router } from "express";
import SubscriptionController from "../../controllers/push-notification.controller.js";
const pushNotificationRouter = Router()

pushNotificationRouter.post('/save-subscription', SubscriptionController.saveSubscription)
pushNotificationRouter.post('/send-notification', SubscriptionController.sendNotification)

export default pushNotificationRouter;