import { User } from '@prisma/client'

export namespace ListUserUsecase {
  export const name = 'ListUserUsecase'

  export type Params = {}

  export type Result = User[]
}

export interface ListUserUsecase {
  perform: (params: ListUserUsecase.Params) => Promise<ListUserUsecase.Result>
}
