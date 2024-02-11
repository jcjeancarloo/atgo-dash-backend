import { BadRequestError } from '@/app/errors'
import type * as GatewayRepository from '@/app/protocols/db/repositories/gateway'
import { type DeleteGatewayUsecase } from '@/domain/usecases/gateways'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteGatewayService implements DeleteGatewayUsecase {
  constructor(
    @inject('GatewayRepository')
    private readonly gatewayRepository: GatewayRepository.Get & GatewayRepository.Delete,
  ) {}
  async perform(params: DeleteGatewayUsecase.Params): Promise<DeleteGatewayUsecase.Result> {
    const gateway = await this.gatewayRepository.get({ id: params.id })
    if (!gateway) throw new BadRequestError('Gateway not found')

    return this.gatewayRepository.delete(params)
  }
}
