export namespace DeleteCompanyUsecase {
  export const name = 'DeleteCompanyUsecase'

  export type Params = {
    id: string
  }

  export type Result = void
}

export interface DeleteCompanyUsecase {
  perform: (params: DeleteCompanyUsecase.Params) => Promise<DeleteCompanyUsecase.Result>
}
