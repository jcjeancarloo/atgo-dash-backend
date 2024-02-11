import { Company, Integration } from '@prisma/client'

export namespace Get {
  export type Params = {
    id: string
  }

  export type Result = Company & { integration: Integration}  | null
}

export interface Get {
  get: (data: Get.Params) => Promise<Get.Result>
}
