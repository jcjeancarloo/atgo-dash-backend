import { Platform, Resources } from '@prisma/client'

export namespace UpdatePlatformUsecase {
  export const name = 'UpdatePlatformUsecase'

  export type Params = {
    id: string
    name?: string
    description?: string
    isActive?: boolean
    resources?: Resources[]
  }

  export type Result = Platform
}

export interface UpdatePlatformUsecase {
  perform: (params: UpdatePlatformUsecase.Params) => Promise<UpdatePlatformUsecase.Result>
}
