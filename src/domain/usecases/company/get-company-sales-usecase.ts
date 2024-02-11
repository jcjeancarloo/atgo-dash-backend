import { type GetSales } from '@/domain/platform/methods'

export namespace GetCompanySalesUsecase {
  export const name = 'GetCompanySalesUsecase'

  export type Params = {
    id: string
    query: {
      startDate: string
      endDate: string
      utmSource?: string
      page: number
      itemsPerPage: number
    }
  }
  export type Result = GetSales.Result
}

export interface GetCompanySalesUsecase {
  perform: (params: GetCompanySalesUsecase.Params) => Promise<GetCompanySalesUsecase.Result>
}
