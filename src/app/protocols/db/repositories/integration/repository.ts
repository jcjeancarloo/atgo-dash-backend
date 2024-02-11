import { type Create, type Delete, type Get, type List, type Update } from './methods'

export namespace IntegrationRepository {
  export const name = 'IntegrationRepository'
}

export interface IntegrationRepository extends List, Get, Create, Update, Delete {}
