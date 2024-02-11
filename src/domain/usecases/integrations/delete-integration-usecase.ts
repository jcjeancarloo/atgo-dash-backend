export namespace DeleteIntegrationUsecase {
  export const name = 'DeleteIntegrationUsecase'

  export type Params = {
    id: string
  }

  export type Result = void
}

export interface DeleteIntegrationUsecase {
  perform: (params: DeleteIntegrationUsecase.Params) => Promise<DeleteIntegrationUsecase.Result>
}
