import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveysRepository } from '../repositories/SurveysRepository'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'
import { UsersRepository } from '../repositories/UsersRepository'
import SendMailService from '../services/SendMailService'
import { resolve } from 'path'

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body

    const userRepository = getCustomRepository(UsersRepository)
    const surveysRepository = getCustomRepository(SurveysRepository)
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const user = await userRepository.findOne({ email })

    if (!user) {
      return response.status(400).json({ error: 'Esse usuário não existe' })
    }

    const survey = await surveysRepository.findOne({ id: survey_id })

    if (!survey) {
      return response.status(400).json({ error: 'Essa pesquisa não existe' })
    }

    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: [{ user_id: user.id }, { value: null }],
      relations: ['user', 'survey'],
    })

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      user_id: user.id,
      link: process.env.URL_MAIL,
    }
    const npsMail = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')

    if (surveyUserAlreadyExists) {
      await SendMailService.execute(email, survey.title, variables, npsMail)
      return response.json(surveyUserAlreadyExists)
    }

    const surveyUser = await surveysUsersRepository.create({
      user_id: user.id,
      survey_id,
    })

    await surveysUsersRepository.save(surveyUser)

    return response.json(surveyUser)
  }
}

export { SendMailController }
