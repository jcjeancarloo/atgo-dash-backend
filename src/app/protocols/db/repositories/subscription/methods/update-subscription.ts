import { Subscription } from '@prisma/client'

export namespace Update {
  export type Params = {
    id: string
    gatewayCustomerId?: string
    gatewaySubscriptionId?: string
    isActive?: boolean
    gatewayId?: string
    planId?: string
  }

  export type Result = Subscription
}

export interface Update {
  update: (data: Update.Params) => Promise<Update.Result>
}
