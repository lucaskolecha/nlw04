import { EntityManager } from 'typeorm'

class CrudController<T> {
  public repository: T

  constructor(private entityManager: EntityManager) {
    this.repository = this.entityManager.getCustomRepository<T>(() => {})
  }
}

export { CrudController }
