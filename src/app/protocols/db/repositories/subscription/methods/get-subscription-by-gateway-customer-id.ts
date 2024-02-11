import { Gateway, Subscription } from '@prisma/client'

export namespace GetSubscriptionByGatewayCustomerId {
  export const name = 'GetSubscriptionByGatewayCustomerId'

  export type Params = { gatewayCustomerId: string }

  export type Result = (Subscription & { gateway: Gateway }) | null
}

export interface GetSubscriptionByGatewayCustomerId {
  getSubscriptionByGatewayCustomerId: (
    data: GetSubscriptionByGatewayCustomerId.Params,
  ) => Promise<GetSubscriptionByGatewayCustomerId.Result>
}
