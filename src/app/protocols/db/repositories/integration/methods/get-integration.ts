import { Integration } from '@prisma/client'

export namespace Get {
  export type Params = {
    id: string
  }

  export type Result = Integration | null
}

export interface Get {
  get: (data: Get.Params) => Promise<Get.Result>
}
