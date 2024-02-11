import type * as GatewayRepository from '@/app/protocols/db/repositories/gateway'
import { type ListGatewayUsecase } from '@/domain/usecases/gateways'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListGatewayService implements ListGatewayUsecase {
  constructor(
    @inject('GatewayRepository') private readonly gatewayRepository: GatewayRepository.List,
  ) {}
  async perform(params: ListGatewayUsecase.Params): Promise<ListGatewayUsecase.Result> {
    return this.gatewayRepository.list(params)
  }
}
