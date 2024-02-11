import { Gateway } from '@prisma/client'

export namespace Get {
  export type Params = { id: string }

  export type Result = Gateway | null
}

export interface Get {
  get: (data: Get.Params) => Promise<Get.Result>
}
