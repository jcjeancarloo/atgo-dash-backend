import { type Create, type Delete, type Get, type List, type Update } from './methods'

export namespace UserRepository {
  export const name = 'UserRepository'
}

export interface UserRepository extends List, Get, Create, Update, Delete {}
