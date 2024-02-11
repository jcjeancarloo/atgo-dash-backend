import { Gateway } from '@prisma/client'

export namespace List {
  export type Params = {}

  export type Result = Gateway[]
}

export interface List {
  list: (data: List.Params) => Promise<List.Result>
}
