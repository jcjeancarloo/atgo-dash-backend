import { type List, type Get, type Create, type Update, type Delete } from './methods'

export namespace PlanRepository {
  export const name = 'PlanRepository'
}

export interface PlanRepository extends List, Get, Create, Update, Delete {}
