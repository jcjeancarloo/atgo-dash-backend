import type * as PlatformKindRepository from '@/app/protocols/db/repositories/platform-kind'
import { type ListPlatformKindUsecase } from '@/domain/usecases/platform-kinds'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListPlatformKindService implements ListPlatformKindUsecase {
  constructor(
    @inject('PlatformKindRepository')
    private readonly platformKindRepository: PlatformKindRepository.List,
  ) {}
  async perform(params: ListPlatformKindUsecase.Params): Promise<ListPlatformKindUsecase.Result> {
    return this.platformKindRepository.list(params)
  }
}
