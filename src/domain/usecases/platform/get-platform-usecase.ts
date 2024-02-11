import { Platform } from '@prisma/client'

export namespace GetPlatformUsecase {
  export const name = 'GetPlatformUsecase'

  export type Params = {
    id: string
  }

  export type Result = Platform | null
}

export interface GetPlatformUsecase {
  perform: (params: GetPlatformUsecase.Params) => Promise<GetPlatformUsecase.Result>
}
