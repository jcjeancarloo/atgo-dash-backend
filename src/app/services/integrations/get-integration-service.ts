import { BadRequestError } from '@/app/errors'
import type * as IntegrationRepository from '@/app/protocols/db/repositories/integration'
import { type GetIntegrationUsecase } from '@/domain/usecases/integrations'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetIntegrationService implements GetIntegrationUsecase {
  constructor(
    @inject('IntegrationRepository')
    private readonly integrationRepository: IntegrationRepository.Get,
  ) {}
  async perform(params: GetIntegrationUsecase.Params): Promise<GetIntegrationUsecase.Result> {
    const integration = await this.integrationRepository.get(params)
    if (!integration) throw new BadRequestError('Integration  not found')
    return integration
  }
}
