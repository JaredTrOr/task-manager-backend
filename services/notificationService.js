import cron from 'node-cron'
import webpush from 'web-push'
import TaskModel from '../models/TaskModel.js'
import PushNotificationSubscriptionModel from '../models/PushNotificationSubscriptionModel.js'

const taskReminders = {}

function calculateNextNotificationTime(reminder) {
  const now = new Date()
  let nextNotificationTime = new Date(now)

  switch (reminder.unitTime) {
    case 'minutos':
      nextNotificationTime.setMinutes(now.getMinutes() + reminder.amount)
      break
    case 'horas':
      nextNotificationTime.setHours(now.getHours() + reminder.amount)
      break
    case 'días':
      nextNotificationTime.setDate(now.getDate() + reminder.amount)
      break
    default:
      throw new Error('Unsupported reminder unit')
  }

  return nextNotificationTime
}

async function sendNotification(task) {
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
      body: task.title,
      vibrate: [100, 50, 100],
      actions: [{ action: 'explore', title: 'Ir a la app' }]
    }
  }

  try {
    const token = await PushNotificationSubscriptionModel.findOne({ userId: task.creator })
    if (token) {
      await webpush.sendNotification(token, JSON.stringify(payload))
      console.log('Notification sent')
    } else {
      console.log('No token found for user:', task.creator)
    }
  } catch (error) {
    console.error('Error sending notification:', error)
  }
}

function scheduleReminders() {
  cron.schedule('* * * * *', async () => {
    const now = new Date()
    const tasks = await TaskModel.find({ checked: false, reminder: { $exists: true } })

    tasks.forEach(task => {
      if (!taskReminders[task._id]) {
        const nextNotificationTime = calculateNextNotificationTime(task.reminder)
        taskReminders[task._id] = {
          nextNotificationTime,
          reminderInterval: task.reminder.amount * 60000 
        }

        sendNotification(task)
      } else {
        const reminder = taskReminders[task._id]
        if (now >= reminder.nextNotificationTime) {
          sendNotification(task)
          reminder.nextNotificationTime = new Date(now.getTime() + reminder.reminderInterval)
        }
      }
    });
  });

  console.log('Notification scheduling initialized.')
}

export default scheduleReminders
