import { type Create, type Delete, type Get, type List, type Update } from './methods'

export namespace PlatformKindRepository {
  export const name = 'PlatformKindRepository'
}

export interface PlatformKindRepository extends List, Get, Create, Update, Delete {}
