import { PlatformKind } from '@prisma/client'

export namespace Update {
  export type Params = {
    id: string
    name?: string
    description?: string
    isActive?: boolean
  }

  export type Result = PlatformKind
}

export interface Update {
  update: (data: Update.Params) => Promise<Update.Result>
}
