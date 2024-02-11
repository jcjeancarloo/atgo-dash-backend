import { BadRequestError } from '@/app/errors'
import type * as GatewayRepository from '@/app/protocols/db/repositories/gateway'
import { type UpdateGatewayUsecase } from '@/domain/usecases/gateways'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateGatewayService implements UpdateGatewayUsecase {
  constructor(
    @inject('GatewayRepository')
    private readonly gatewayRepository: GatewayRepository.Get & GatewayRepository.Update,
  ) {}
  async perform(params: UpdateGatewayUsecase.Params): Promise<UpdateGatewayUsecase.Result> {
    const gateway = await this.gatewayRepository.get({ id: params.id })
    if (!gateway) throw new BadRequestError('Gateway not found')

    return this.gatewayRepository.update(params)
  }
}
