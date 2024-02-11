import type * as SubscriptionRepository from '@/app/protocols/db/repositories/subscription'
import { type CreateSubscriptionUsecase } from '@/domain/usecases/subscriptions'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateSubscriptionService implements CreateSubscriptionUsecase {
  constructor(
    @inject('SubscriptionRepository')
    private readonly subscriptionRepository: SubscriptionRepository.Create,
  ) {}
  async perform(
    params: CreateSubscriptionUsecase.Params,
  ): Promise<CreateSubscriptionUsecase.Result> {
    return this.subscriptionRepository.create(params)
  }
}
