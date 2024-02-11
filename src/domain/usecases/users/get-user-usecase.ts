import { User } from '@prisma/client'

export namespace GetUserUsecase {
  export const name = 'GetUserUsecase'

  export type Params = {
    id: string
  }

  export type Result = User | null
}

export interface GetUserUsecase {
  perform: (params: GetUserUsecase.Params) => Promise<GetUserUsecase.Result>
}
