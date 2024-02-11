import { Integration } from '@prisma/client'

export namespace GetIntegrationUsecase {
  export const name = 'GetIntegrationUsecase'

  export type Params = {
    id: string
  }

  export type Result = Integration | null
}

export interface GetIntegrationUsecase {
  perform: (params: GetIntegrationUsecase.Params) => Promise<GetIntegrationUsecase.Result>
}
