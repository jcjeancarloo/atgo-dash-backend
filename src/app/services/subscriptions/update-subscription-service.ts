import { BadRequestError } from '@/app/errors'
import type * as SubscriptionRepository from '@/app/protocols/db/repositories/subscription'
import { type UpdateSubscriptionUsecase } from '@/domain/usecases/subscriptions'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateSubscriptionService implements UpdateSubscriptionUsecase {
  constructor(
    @inject('SubscriptionRepository')
    private readonly subscriptionRepository: SubscriptionRepository.Update,
  ) {}
  async perform(
    params: UpdateSubscriptionUsecase.Params,
  ): Promise<UpdateSubscriptionUsecase.Result> {
    const subscription = await this.subscriptionRepository.update(params)
    if (!subscription) throw new BadRequestError('Subscription not found')

    return subscription
  }
}
