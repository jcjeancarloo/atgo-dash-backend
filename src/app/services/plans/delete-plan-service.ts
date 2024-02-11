import { BadRequestError } from '@/app/errors'
import type * as PlanRepository from '@/app/protocols/db/repositories/plan'
import { type DeletePlanUsecase } from '@/domain/usecases/plans'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeletePlanService implements DeletePlanUsecase {
  constructor(
    @inject('PlanRepository')
    private readonly planRepository: PlanRepository.Get & PlanRepository.Delete,
  ) {}
  async perform(params: DeletePlanUsecase.Params): Promise<DeletePlanUsecase.Result> {
    const plan = await this.planRepository.get({ id: params.id })
    if (!plan) throw new BadRequestError('Plan not found')

    return this.planRepository.delete(params)
  }
}
