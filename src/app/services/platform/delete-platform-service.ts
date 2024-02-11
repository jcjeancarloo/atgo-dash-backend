import { BadRequestError } from '@/app/errors'
import type * as PlatformRepository from '@/app/protocols/db/repositories/platform-kind'
import { type DeletePlatformUsecase } from '@/domain/usecases/platform'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeletePlatformService implements DeletePlatformUsecase {
  constructor(
    @inject('PlatformRepository')
    private readonly platformRepository: PlatformRepository.Get & PlatformRepository.Delete,
  ) {}
  async perform(params: DeletePlatformUsecase.Params): Promise<DeletePlatformUsecase.Result> {
    const platform = await this.platformRepository.get({ id: params.id })
    if (!platform) throw new BadRequestError('Platform not found')

    return this.platformRepository.delete(params)
  }
}
