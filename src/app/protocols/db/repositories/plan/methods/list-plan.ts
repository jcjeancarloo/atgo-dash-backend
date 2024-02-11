import { Plan } from '@prisma/client'

export namespace List {
  export type Params = {}

  export type Result = Plan[]
}

export interface List {
  list: (data: List.Params) => Promise<List.Result>
}
