import { Company } from '@prisma/client'

export namespace List {
  export type Params = {}

  export type Result = Company[]
}

export interface List {
  list: (data: List.Params) => Promise<List.Result>
}
