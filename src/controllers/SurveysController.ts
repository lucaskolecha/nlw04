import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveysRepository } from '../repositories/SurveysRepository'

class SurveysController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body

    const surveysRepository = getCustomRepository(SurveysRepository)

    const survey = surveysRepository.create({ title, description })

    await surveysRepository.save(survey)

    return response.status(201).json(survey)
  }

  async show(request: Request, response: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository)
    const all = await surveysRepository.find()
    return response.status(201).json(all)
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params
    const surveysRepository = getCustomRepository(SurveysRepository)

    const exists = await surveysRepository.findOne({ id })

    if (exists) {
      surveysRepository.delete(id)
      return response.status(201).json({ message: 'Deletado com sucesso!' })
    } else {
      return response.status(400).json({ message: 'ID não encontrado' })
    }
  }
}

export { SurveysController }
