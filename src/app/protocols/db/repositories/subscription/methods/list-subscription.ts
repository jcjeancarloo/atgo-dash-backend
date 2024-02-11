import { Subscription } from '@prisma/client'

export namespace List {
  export type Params = {}

  export type Result = Subscription[]
}

export interface List {
  list: (data: List.Params) => Promise<List.Result>
}
