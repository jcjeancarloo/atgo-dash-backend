export namespace DeleteUserUsecase {
  export const name = 'DeleteUserUsecase'

  export type Params = {
    id: string
  }

  export type Result = void
}

export interface DeleteUserUsecase {
  perform: (params: DeleteUserUsecase.Params) => Promise<DeleteUserUsecase.Result>
}
