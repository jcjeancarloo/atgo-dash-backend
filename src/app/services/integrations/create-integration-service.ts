import type * as IntegrationRepository from '@/app/protocols/db/repositories/integration'
import { type CreateIntegrationUsecase } from '@/domain/usecases/integrations'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateIntegrationService implements CreateIntegrationUsecase {
  constructor(
    @inject('IntegrationRepository')
    private readonly integrationRepository: IntegrationRepository.Create,
  ) {}
  async perform(params: CreateIntegrationUsecase.Params): Promise<CreateIntegrationUsecase.Result> {
    return this.integrationRepository.create(params)
  }
}
