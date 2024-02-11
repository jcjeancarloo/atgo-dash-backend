import { Integration } from '@prisma/client'

export namespace UpdateIntegrationUsecase {
  export const name = 'UpdateIntegrationUsecase'

  export type Params = {
    id: string
    privateKey?: string
    publicKey?: string
    url?: string
  }

  export type Result = Integration
}

export interface UpdateIntegrationUsecase {
  perform: (params: UpdateIntegrationUsecase.Params) => Promise<UpdateIntegrationUsecase.Result>
}
