import { Integration } from '@prisma/client'

export namespace ListIntegrationUsecase {
  export const name = 'ListIntegrationUsecase'

  export type Params = {}

  export type Result = Integration[]
}

export interface ListIntegrationUsecase {
  perform: (params: ListIntegrationUsecase.Params) => Promise<ListIntegrationUsecase.Result>
}
