import { Integration } from '@prisma/client'

export namespace Update {
  export type Params = {
    id: string
    privateKey?: string
    publicKey?: string
    url?: string
  }

  export type Result = Integration
}

export interface Update {
  update: (data: Update.Params) => Promise<Update.Result>
}
