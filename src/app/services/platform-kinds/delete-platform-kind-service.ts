import { BadRequestError } from '@/app/errors'
import type * as PlatformKindRepository from '@/app/protocols/db/repositories/platform-kind'
import { type DeletePlatformKindUsecase } from '@/domain/usecases/platform-kinds'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeletePlatformKindService implements DeletePlatformKindUsecase {
  constructor(
    @inject('PlatformKindRepository')
    private readonly platformKindRepository: PlatformKindRepository.Get &
      PlatformKindRepository.Delete,
  ) {}
  async perform(
    params: DeletePlatformKindUsecase.Params,
  ): Promise<DeletePlatformKindUsecase.Result> {
    const platformKind = await this.platformKindRepository.get({ id: params.id })
    if (!platformKind) throw new BadRequestError('Platform kind not found')

    return this.platformKindRepository.delete(params)
  }
}
