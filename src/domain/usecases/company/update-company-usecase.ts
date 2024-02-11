import { Company } from '@prisma/client'

export namespace UpdateCompanyUsecase {
  export const name = 'UpdateCompanyUsecase'

  export type Params = {
    id: string
    name?: string
    description?: string
    website?: string
    isActive?: boolean
  }

  export type Result = Company
}

export interface UpdateCompanyUsecase {
  perform: (params: UpdateCompanyUsecase.Params) => Promise<UpdateCompanyUsecase.Result>
}
