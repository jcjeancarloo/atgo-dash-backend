import { BadRequestError } from '@/app/errors'
import type * as IntegrationRepository from '@/app/protocols/db/repositories/companies'
import { type DeleteIntegrationUsecase } from '@/domain/usecases/integrations'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteIntegrationService implements DeleteIntegrationUsecase {
  constructor(
    @inject('IntegrationRepository')
    private readonly integrationRepository: IntegrationRepository.Get &
      IntegrationRepository.Delete,
  ) {}
  async perform(params: DeleteIntegrationUsecase.Params): Promise<DeleteIntegrationUsecase.Result> {
    const integration = await this.integrationRepository.get({ id: params.id })
    if (!integration) throw new BadRequestError('Integration not found')

    return this.integrationRepository.delete(params)
  }
}
