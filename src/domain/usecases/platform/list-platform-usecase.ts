import { Platform } from '@prisma/client'

export namespace ListPlatformUsecase {
  export const name = 'ListPlatformUsecase'

  export type Params = {}

  export type Result = Platform[]
}

export interface ListPlatformUsecase {
  perform: (params: ListPlatformUsecase.Params) => Promise<ListPlatformUsecase.Result>
}
