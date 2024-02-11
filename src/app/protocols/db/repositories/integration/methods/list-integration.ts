import { Integration } from '@prisma/client'

export namespace List {
  export type Params = {}

  export type Result = Integration[]
}

export interface List {
  list: (data: List.Params) => Promise<List.Result>
}
