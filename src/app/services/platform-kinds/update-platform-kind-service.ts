import { BadRequestError } from '@/app/errors'
import type * as PlatformKindRepository from '@/app/protocols/db/repositories/platform-kind'
import { type UpdatePlatformKindUsecase } from '@/domain/usecases/platform-kinds'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdatePlatformKindService implements UpdatePlatformKindUsecase {
  constructor(
    @inject('PlatformKindRepository')
    private readonly platformKindRepository: PlatformKindRepository.Get &
      PlatformKindRepository.Update,
  ) {}
  async perform(
    params: UpdatePlatformKindUsecase.Params,
  ): Promise<UpdatePlatformKindUsecase.Result> {
    const platformKind = await this.platformKindRepository.get({ id: params.id })
    if (!platformKind) throw new BadRequestError('Platform kind not found')

    return this.platformKindRepository.update(params)
  }
}
