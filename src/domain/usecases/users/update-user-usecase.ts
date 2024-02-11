import { User } from '@prisma/client'

export namespace UpdateUserUsecase {
  export const name = 'UpdateUserUsecase'

  export type Params = {
    id: string
    password?: string
  }

  export type Result = User
}

export interface UpdateUserUsecase {
  perform: (params: UpdateUserUsecase.Params) => Promise<UpdateUserUsecase.Result>
}
