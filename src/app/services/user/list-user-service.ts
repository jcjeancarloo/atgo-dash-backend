import type * as UserRepository from '@/app/protocols/db/repositories/user'
import { type ListUserUsecase } from '@/domain/usecases/users'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListUserService implements ListUserUsecase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: UserRepository.List,
  ) {}
  async perform(params: ListUserUsecase.Params): Promise<ListUserUsecase.Result> {
    return this.userRepository.list(params)
  }
}
