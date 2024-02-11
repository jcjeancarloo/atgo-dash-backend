import { BadRequestError } from '@/app/errors'
import type * as PlanRepository from '@/app/protocols/db/repositories/plan'
import { type UpdatePlanUsecase } from '@/domain/usecases/plans'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdatePlanService implements UpdatePlanUsecase {
  constructor(
    @inject('PlanRepository')
    private readonly planRepository: PlanRepository.Get & PlanRepository.Update,
  ) {}
  async perform(params: UpdatePlanUsecase.Params): Promise<UpdatePlanUsecase.Result> {
    const plan = await this.planRepository.get({ id: params.id })
    if (!plan) throw new BadRequestError('Plan not found')

    return this.planRepository.update(params)
  }
}
