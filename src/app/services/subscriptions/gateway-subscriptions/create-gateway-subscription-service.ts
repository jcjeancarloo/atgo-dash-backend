import PaymentGatewayProvider from '@/domain/payment'
import { type CreateGatewaySubscriptionUsecase } from '@/domain/usecases/subscriptions'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateGatewaysSubscriptionService implements CreateGatewaySubscriptionUsecase {
  constructor(
    @inject('PaymentGatewayProvider')
    private readonly paymentGatewayProvider: PaymentGatewayProvider,
  ) {}

  async perform(
    params: CreateGatewaySubscriptionUsecase.Params,
  ): Promise<CreateGatewaySubscriptionUsecase.Result> {
    const gatewaySubscription = await this.paymentGatewayProvider.createGatewaySubscription(params)
    return gatewaySubscription
  }
}
