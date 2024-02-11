import { type Create, type Delete, type Get, type List, type Update } from './methods'

export namespace CompanyRepository {
  export const name = 'CompanyRepository'
}

export interface CompanyRepository extends List, Get, Create, Update, Delete {}
