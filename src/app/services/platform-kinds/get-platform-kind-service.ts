import { BadRequestError } from '@/app/errors'
import type * as PlatformKindRepository from '@/app/protocols/db/repositories/platform-kind'
import { type GetPlatformKindUsecase } from '@/domain/usecases/platform-kinds'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetPlatformKindService implements GetPlatformKindUsecase {
  constructor(
    @inject('PlatformKindRepository')
    private readonly platformKindRepository: PlatformKindRepository.Get,
  ) {}
  async perform(params: GetPlatformKindUsecase.Params): Promise<GetPlatformKindUsecase.Result> {
    const platformKind = await this.platformKindRepository.get(params)
    if (!platformKind) throw new BadRequestError('Platform Kind not found')
    return platformKind
  }
}
