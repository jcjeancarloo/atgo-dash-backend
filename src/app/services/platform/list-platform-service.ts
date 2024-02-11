import type * as PlatformRepository from '@/app/protocols/db/repositories/platform'
import { type ListPlatformUsecase } from '@/domain/usecases/platform'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListPlatformService implements ListPlatformUsecase {
  constructor(
    @inject('PlatformRepository')
    private readonly platformRepository: PlatformRepository.List,
  ) {}
  async perform(params: ListPlatformUsecase.Params): Promise<ListPlatformUsecase.Result> {
    return this.platformRepository.list(params)
  }
}
