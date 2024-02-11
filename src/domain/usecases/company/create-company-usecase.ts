import { Company } from '@prisma/client'

export namespace CreateCompanyUsecase {
  export const name = 'CreateCompanyUsecase'

  export type Params = Company

  export type Result = Company
}

export interface CreateCompanyUsecase {
  perform: (params: CreateCompanyUsecase.Params) => Promise<CreateCompanyUsecase.Result>
}
