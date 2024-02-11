import { BadRequestError } from '@/app/errors'
import type * as SubscriptionRepository from '@/app/protocols/db/repositories/subscription'
import { type GetSubscriptionUsecase } from '@/domain/usecases/subscriptions'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetSubscriptionService implements GetSubscriptionUsecase {
  constructor(
    @inject('SubscriptionRepository')
    private readonly SubscriptionRepository: SubscriptionRepository.Get,
  ) {}
  async perform(params: GetSubscriptionUsecase.Params): Promise<GetSubscriptionUsecase.Result> {
    const subscription = await this.SubscriptionRepository.get(params)
    if (!subscription) throw new BadRequestError('Subscription not found')

    return subscription
  }
}
