import type * as SubscriptionRepository from '@/app/protocols/db/repositories/subscription'
import { type ListSubscriptionUsecase } from '@/domain/usecases/subscriptions'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListSubscriptionService implements ListSubscriptionUsecase {
  constructor(
    @inject('SubscriptionRepository')
    private readonly subscriptionRepository: SubscriptionRepository.List,
  ) {}
  async perform(params: ListSubscriptionUsecase.Params): Promise<ListSubscriptionUsecase.Result> {
    return await this.subscriptionRepository.list(params)
  }
}
