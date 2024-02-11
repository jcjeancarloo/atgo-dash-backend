import { type Create, type Delete, type Get, type List, type Update } from './methods'

export namespace GatewayRepository {
  export const name = 'GatewayRepository'
}

export interface GatewayRepository extends List, Get, Create, Update, Delete {}
