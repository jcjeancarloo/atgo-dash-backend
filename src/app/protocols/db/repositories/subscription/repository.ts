import {
  type Create,
  type Delete,
  type Get,
  type GetSubscriptionByGatewayCustomerId,
  type List,
  type Update,
} from './methods'

export namespace SubscriptionRepository {
  export const name = 'SubscriptionRepository'
}

export interface SubscriptionRepository
  extends Get,
    List,
    Create,
    Update,
    Delete,
    GetSubscriptionByGatewayCustomerId {}
