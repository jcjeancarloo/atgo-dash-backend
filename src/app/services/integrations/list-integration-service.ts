import type * as IntegrationRepository from '@/app/protocols/db/repositories/integration'
import { type ListIntegrationUsecase } from '@/domain/usecases/integrations'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListIntegrationService implements ListIntegrationUsecase {
  constructor(
    @inject('IntegrationRepository')
    private readonly integrationRepository: IntegrationRepository.List,
  ) {}
  async perform(params: ListIntegrationUsecase.Params): Promise<ListIntegrationUsecase.Result> {
    return this.integrationRepository.list(params)
  }
}
