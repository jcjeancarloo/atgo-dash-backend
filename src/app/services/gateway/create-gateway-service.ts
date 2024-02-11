import type * as GatewayRepository from '@/app/protocols/db/repositories/gateway'
import { type CreateGatewayUsecase } from '@/domain/usecases/gateways'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateGatewayService implements CreateGatewayUsecase {
  constructor(
    @inject('GatewayRepository') private readonly gatewayRepository: GatewayRepository.Create,
  ) {}
  async perform(params: CreateGatewayUsecase.Params): Promise<CreateGatewayUsecase.Result> {
    return this.gatewayRepository.create(params)
  }
}
