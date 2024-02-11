import { BadRequestError } from '@/app/errors'
import type * as PlanRepository from '@/app/protocols/db/repositories/plan'
import { type GetPlanUsecase } from '@/domain/usecases/plans'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetPlanService implements GetPlanUsecase {
  constructor(@inject('PlanRepository') private readonly planRepository: PlanRepository.Get) {}
  async perform(params: GetPlanUsecase.Params): Promise<GetPlanUsecase.Result> {
    const plan = await this.planRepository.get(params)
    if (!plan) throw new BadRequestError('Plan not found')

    return plan
  }
}
