import { Subscription } from '@prisma/client'

export namespace Get {
  export type Params = { id: string }

  export type Result = Subscription | null
}

export interface Get {
  get: (data: Get.Params) => Promise<Get.Result>
}
