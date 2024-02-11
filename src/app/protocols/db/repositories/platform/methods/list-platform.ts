import { Platform } from '@prisma/client'

export namespace List {
  export type Params = {}

  export type Result = Platform[]
}

export interface List {
  list: (data: List.Params) => Promise<List.Result>
}
