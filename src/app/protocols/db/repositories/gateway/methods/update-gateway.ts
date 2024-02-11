import { Gateway } from '@prisma/client'

export namespace Update {
  export type Params = {
    id: string
    name: string
  }

  export type Result = Gateway
}

export interface Update {
  update: (data: Update.Params) => Promise<Update.Result>
}
