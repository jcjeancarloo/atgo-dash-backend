import { BadRequestError } from '@/app/errors'
import type * as UserRepository from '@/app/protocols/db/repositories/user'
import { type UpdateUserUsecase } from '@/domain/usecases/users'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateUserService implements UpdateUserUsecase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: UserRepository.Get & UserRepository.Update,
  ) {}
  async perform(params: UpdateUserUsecase.Params): Promise<UpdateUserUsecase.Result> {
    const user = await this.userRepository.get({ id: params.id })
    if (!user) throw new BadRequestError('User not found')

    return this.userRepository.update(params)
  }
}
