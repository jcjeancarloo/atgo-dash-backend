import { User } from '@prisma/client'

export namespace List {
  export type Params = {}

  export type Result = User[]
}

export interface List {
  list: (data: List.Params) => Promise<List.Result>
}
