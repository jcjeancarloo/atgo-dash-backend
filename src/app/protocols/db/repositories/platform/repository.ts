import { type Create, type Delete, type Get, type List, type Update } from './methods'

export namespace PlatformRepository {
  export const name = 'PlatformRepository'
}

export interface PlatformRepository extends List, Get, Create, Update, Delete {}
