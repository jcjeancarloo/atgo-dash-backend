import { Platform } from '@prisma/client'

export namespace CreatePlatformUsecase {
  export const name = 'CreatePlatformUsecase'

  export type Params = Platform

  export type Result = Platform
}

export interface CreatePlatformUsecase {
  perform: (params: CreatePlatformUsecase.Params) => Promise<CreatePlatformUsecase.Result>
}
