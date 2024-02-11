import { BadRequestError } from '@/app/errors'
import { type Hasher, type Signer } from '@/app/protocols/cryptography'
import type * as UserRepository from '@/app/protocols/db/repositories/user'
import { HttpClient } from '@/app/protocols/http-client/http-client'
import { LoginUsecase } from '@/domain/usecases/authentication'
import { inject, injectable } from 'tsyringe'

@injectable()
export class LoginService implements LoginUsecase {
  constructor(
    @inject('UserRepository') private readonly userRepository: UserRepository.GetByEmail,
    @inject('Signer') private readonly signer: Signer.Sign & Signer.Decode,
    @inject('Hasher') private readonly hasher: Hasher.Compare,
    @inject('HttpClient') private readonly httpClient: HttpClient,
  ) {}

  async perform(params: LoginUsecase.Params): Promise<LoginUsecase.Result> {
    const user = await this.userRepository.getByEmail({ email: params.email })

    const checkCredentials = user && (await this.hasher.compare(params.password, user.password))
    if (!checkCredentials) throw new BadRequestError('E-mail or password invalid')

    // TODO: Must cache the access_token
    const access_token = await this.signer.sign(user)

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isActive: user.isActive,
      access_token,
      company: {
        id: user.company.id,
        name: user.company.name,
        document: user.company.document,
        ...(user.company.description && { description: user.company.description }),
        ...(user.company.website && { website: user.company.website }),
        isActive: user.company.isActive,
      },
    }
  }
}
