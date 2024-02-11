import { SalesPaymentType } from '@/shared'

export namespace GetSales {
  export type Sale = {
    status: 'awaiting_payment' | 'paid' | 'canceled'
    value: number
    date: Date
    externalOrderId: string
    paymentMethod: SalesPaymentType
  }

  export type Params = {
    privateKey: string
    publicKey?: string
    integrationUrl: string
    platformId: string
  }

  export type Result = {
    items: Sale[]
    totalAwaitingPaymentSales: number
    totalPaidSales: number
    totalCanceledSales: number
    totalCount: number
    totalAmount: number
    totalByPaymentMethod: {
      creditCard: number
      pix: number
      boleto: number
      // others: number
    }
  }
}

export interface GetSales {
  getSales(params: GetSales.Params): Promise<GetSales.Result>
}
