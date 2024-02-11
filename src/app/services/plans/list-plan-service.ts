import type * as PlanRepository from '@/app/protocols/db/repositories/plan'
import { type ListPlanUsecase } from '@/domain/usecases/plans'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListPlanService implements ListPlanUsecase {
  constructor(@inject('PlanRepository') private readonly planRepository: PlanRepository.List) {}
  async perform(params: ListPlanUsecase.Params): Promise<ListPlanUsecase.Result> {
    return this.planRepository.list(params)
  }
}
