import { BadRequestError } from '@/app/errors'
import type * as IntegrationRepository from '@/app/protocols/db/repositories/integration'
import { type UpdateIntegrationUsecase } from '@/domain/usecases/integrations'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateIntegrationService implements UpdateIntegrationUsecase {
  constructor(
    @inject('IntegrationRepository')
    private readonly integrationRepository: IntegrationRepository.Get &
      IntegrationRepository.Update,
  ) {}
  async perform(params: UpdateIntegrationUsecase.Params): Promise<UpdateIntegrationUsecase.Result> {
    const integration = await this.integrationRepository.get({ id: params.id })
    if (!integration) throw new BadRequestError('Integration not found')

    return this.integrationRepository.update(params)
  }
}
