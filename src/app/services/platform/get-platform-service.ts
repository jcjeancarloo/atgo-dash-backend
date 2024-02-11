import { BadRequestError } from '@/app/errors'
import type * as PlatformRepository from '@/app/protocols/db/repositories/platform'
import { type GetPlatformUsecase } from '@/domain/usecases/platform'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetPlatformService implements GetPlatformUsecase {
  constructor(
    @inject('PlatformRepository')
    private readonly platformRepository: PlatformRepository.Get,
  ) {}
  async perform(params: GetPlatformUsecase.Params): Promise<GetPlatformUsecase.Result> {
    const platform = await this.platformRepository.get(params)
    if (!platform) throw new BadRequestError('Platform  not found')
    return platform
  }
}
