import { Company } from '@prisma/client'

export namespace GetCompanyUsecase {
  export const name = 'GetCompanyUsecase'

  export type Params = {
    id: string
  }

  export type Result = Company | null
}

export interface GetCompanyUsecase {
  perform: (params: GetCompanyUsecase.Params) => Promise<GetCompanyUsecase.Result>
}
