import { type GetSales } from '@/domain/platform/methods'

export namespace GetPlatformSalesUsecase {
  export const name = 'GetPlatformSalesUsecase'

  export type Params = GetSales.Params
  export type Result = GetSales.Result
}

export interface GetPlatformSalesUsecase {
  perform: (params: GetPlatformSalesUsecase.Params) => Promise<GetPlatformSalesUsecase.Result>
}
