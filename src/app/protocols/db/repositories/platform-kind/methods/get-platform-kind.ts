import { PlatformKind } from '@prisma/client'

export namespace Get {
  export type Params = {
    id: string
  }

  export type Result = PlatformKind | null
}

export interface Get {
  get: (data: Get.Params) => Promise<Get.Result>
}
