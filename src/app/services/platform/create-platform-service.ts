import type * as PlatformRepository from '@/app/protocols/db/repositories/platform'
import { type CreatePlatformUsecase } from '@/domain/usecases/platform'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreatePlatformService implements CreatePlatformUsecase {
  constructor(
    @inject('PlatformRepository')
    private readonly platformRepository: PlatformRepository.Create,
  ) {}
  async perform(params: CreatePlatformUsecase.Params): Promise<CreatePlatformUsecase.Result> {
    return this.platformRepository.create(params)
  }
}
