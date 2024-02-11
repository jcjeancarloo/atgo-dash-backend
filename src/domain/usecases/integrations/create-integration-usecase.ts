import { Integration } from '@prisma/client'

export namespace CreateIntegrationUsecase {
  export const name = 'CreateIntegrationUsecase'

  export type Params = Integration

  export type Result = Integration
}

export interface CreateIntegrationUsecase {
  perform: (params: CreateIntegrationUsecase.Params) => Promise<CreateIntegrationUsecase.Result>
}
