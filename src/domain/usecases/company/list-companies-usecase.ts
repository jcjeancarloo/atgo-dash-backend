import { Company } from '@prisma/client'

export namespace ListCompaniesUsecase {
  export const name = 'ListCompaniesUsecase'

  export type Params = {}

  export type Result = Company[]
}

export interface ListCompaniesUsecase {
  perform: (params: ListCompaniesUsecase.Params) => Promise<ListCompaniesUsecase.Result>
}
