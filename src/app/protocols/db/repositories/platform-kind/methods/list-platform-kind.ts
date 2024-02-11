import { PlatformKind } from '@prisma/client'

export namespace List {
  export type Params = {}

  export type Result = PlatformKind[]
}

export interface List {
  list: (data: List.Params) => Promise<List.Result>
}
