import { Plan } from '@prisma/client'

export namespace Get {
  export type Params = { id: string }

  export type Result = Plan | null
}

export interface Get {
  get: (data: Get.Params) => Promise<Get.Result>
}
