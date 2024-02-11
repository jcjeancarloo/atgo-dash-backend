export namespace DeletePlatformUsecase {
  export const name = 'DeletePlatformUsecase'

  export type Params = {
    id: string
  }

  export type Result = void
}

export interface DeletePlatformUsecase {
  perform: (params: DeletePlatformUsecase.Params) => Promise<DeletePlatformUsecase.Result>
}
