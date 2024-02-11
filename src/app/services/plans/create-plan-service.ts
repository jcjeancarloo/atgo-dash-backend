import type * as PlanRepository from '@/app/protocols/db/repositories/plan'
import { type CreatePlanUsecase } from '@/domain/usecases/plans'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreatePlanService implements CreatePlanUsecase {
  constructor(@inject('PlanRepository') private readonly planRepository: PlanRepository.Create) {}
  async perform(params: CreatePlanUsecase.Params): Promise<CreatePlanUsecase.Result> {
    return this.planRepository.create(params)
  }
}
