import { BadRequestError } from '@/app/errors'
import type * as UserRepository from '@/app/protocols/db/repositories/user'
import { type DeleteUserUsecase } from '@/domain/usecases/users'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteUserService implements DeleteUserUsecase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: UserRepository.Get & UserRepository.Delete,
  ) {}
  async perform(params: DeleteUserUsecase.Params): Promise<DeleteUserUsecase.Result> {
    const user = await this.userRepository.get({ id: params.id })
    if (!user) throw new BadRequestError('User not found')

    return this.userRepository.delete(params)
  }
}
