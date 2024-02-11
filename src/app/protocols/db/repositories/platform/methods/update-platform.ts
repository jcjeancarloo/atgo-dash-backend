import { Platform, Resources } from '@prisma/client'

export namespace Update {
  export type Params = {
    id: string
    name?: string
    description?: string
    isActive?: boolean
    resources?: Resources[]
  }

  export type Result = Platform
}

export interface Update {
  update: (data: Update.Params) => Promise<Update.Result>
}
