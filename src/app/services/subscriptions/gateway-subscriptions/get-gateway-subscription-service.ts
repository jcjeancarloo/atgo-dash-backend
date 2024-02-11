import PaymentGatewayProvider from '@/domain/payment'
import { type GetGatewaySubscriptionUsecase } from '@/domain/usecases/subscriptions'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetGatewaysSubscriptionService implements GetGatewaySubscriptionUsecase {
  constructor(
    @inject('PaymentGatewayProvider')
    private readonly paymentGatewayProvider: PaymentGatewayProvider,
  ) {}

  async perform(
    params: GetGatewaySubscriptionUsecase.Params,
  ): Promise<GetGatewaySubscriptionUsecase.Result> {
    const gatewaySubscription = await this.paymentGatewayProvider.getGatewaySubscription(params)
    return gatewaySubscription
  }
}
