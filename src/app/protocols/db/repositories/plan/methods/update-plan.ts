import { Plan } from '@prisma/client'

export namespace Update {
  export type Params = {
    id: string
    name?: string
    amount?: number
    isActive?: boolean
  }

  export type Result = Plan
}

export interface Update {
  update: (data: Update.Params) => Promise<Update.Result>
}
