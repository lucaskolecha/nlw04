import { Router } from 'express'
import { SendMailController } from './controllers/SendMailController'
import { SurveysController } from './controllers/SurveysController'
import { UsersController } from './controllers/UsersController'

const router = Router()
const userController = new UsersController()
const surveysController = new SurveysController()
const sendMailController = new SendMailController()

/** Users */
router.post('/users', userController.create)

/** Surveys */
router.post('/surveys', surveysController.create)
router.get('/surveys', surveysController.show)
router.delete('/surveys/:id', surveysController.delete)

/** Mail */
router.post('/send-mail', sendMailController.execute)

export { router }
