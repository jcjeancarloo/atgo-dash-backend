import { BadRequestError } from '@/app/errors'
import type * as UserRepository from '@/app/protocols/db/repositories/user'
import { type GetUserUsecase } from '@/domain/usecases/users'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetUserService implements GetUserUsecase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: UserRepository.Get,
  ) {}
  async perform(params: GetUserUsecase.Params): Promise<GetUserUsecase.Result> {
    const user = await this.userRepository.get(params)
    if (!user) throw new BadRequestError('User  not found')
    return user
  }
}
