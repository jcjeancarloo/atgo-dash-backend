import { User } from '@prisma/client'

export namespace CreateUserUsecase {
  export const name = 'CreateUserUsecase'

  export type Params = User

  export type Result = User
}

export interface CreateUserUsecase {
  perform: (params: CreateUserUsecase.Params) => Promise<CreateUserUsecase.Result>
}
