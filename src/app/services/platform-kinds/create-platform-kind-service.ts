import type * as PlatformKindRepository from '@/app/protocols/db/repositories/platform-kind'
import { type CreatePlatformKindUsecase } from '@/domain/usecases/platform-kinds'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreatePlatformKindService implements CreatePlatformKindUsecase {
  constructor(
    @inject('PlatformKindRepository')
    private readonly platformKindRepository: PlatformKindRepository.Create,
  ) {}
  async perform(
    params: CreatePlatformKindUsecase.Params,
  ): Promise<CreatePlatformKindUsecase.Result> {
    return this.platformKindRepository.create(params)
  }
}
