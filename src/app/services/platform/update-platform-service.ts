import { BadRequestError } from '@/app/errors'
import type * as PlatformRepository from '@/app/protocols/db/repositories/platform'
import { type UpdatePlatformUsecase } from '@/domain/usecases/platform'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdatePlatformService implements UpdatePlatformUsecase {
  constructor(
    @inject('PlatformRepository')
    private readonly platformRepository: PlatformRepository.Get & PlatformRepository.Update,
  ) {}
  async perform(params: UpdatePlatformUsecase.Params): Promise<UpdatePlatformUsecase.Result> {
    const platform = await this.platformRepository.get({ id: params.id })
    if (!platform) throw new BadRequestError('Platform not found')

    return this.platformRepository.update(params)
  }
}
