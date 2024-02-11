import { BadRequestError } from '@/app/errors'
import type * as GatewayRepository from '@/app/protocols/db/repositories/gateway'
import { type GetGatewayUsecase } from '@/domain/usecases/gateways'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetGatewayService implements GetGatewayUsecase {
  constructor(
    @inject('GatewayRepository') private readonly gatewayRepository: GatewayRepository.Get,
  ) {}
  async perform(params: GetGatewayUsecase.Params): Promise<GetGatewayUsecase.Result> {
    const gateway = await this.gatewayRepository.get(params)
    if (!gateway) throw new BadRequestError('Gateway not found')

    return gateway
  }
}
