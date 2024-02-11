import { Company } from '@prisma/client'

export namespace Update {
  export type Params = {
    id: string
    name?: string
    description?: string
    website?: string
    isActive?: boolean
  }

  export type Result = Company
}

export interface Update {
  update: (data: Update.Params) => Promise<Update.Result>
}
