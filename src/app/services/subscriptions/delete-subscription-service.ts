import { BadRequestError } from '@/app/errors'
import type * as SubscriptionRepository from '@/app/protocols/db/repositories/subscription'
import { type DeleteSubscriptionUsecase } from '@/domain/usecases/subscriptions'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteSubscriptionService implements DeleteSubscriptionUsecase {
  constructor(
    @inject('SubscriptionRepository')
    private readonly SubscriptionRepository: SubscriptionRepository.Get &
      SubscriptionRepository.Delete,
  ) {}
  async perform(
    params: DeleteSubscriptionUsecase.Params,
  ): Promise<DeleteSubscriptionUsecase.Result> {
    const subscription = await this.SubscriptionRepository.get(params)
    if (!subscription) throw new BadRequestError('Subscription not found')

    await this.SubscriptionRepository.delete(params)
  }
}
