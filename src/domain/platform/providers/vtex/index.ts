import { BadGatewayError } from '@/app/errors'
import { HttpClient } from '@/app/protocols/http-client/http-client'
import PlatformProvider from '@/domain/platform'
import { type GetSales } from '@/domain/platform/methods'
import {
  calcTotalByPaymentMethod,
  calcTotalByPaymentStatus,
  getPaymentMethod,
  getTotalByPaymentMethod,
  getTotalByPaymentStatus,
} from '@/utils'
import { inject, injectable } from 'tsyringe'

@injectable()
export class VtexProvider implements PlatformProvider {
  constructor(@inject('HttpClient') private readonly httpClient: HttpClient) {}

  async getSales(params: GetSales.Params): Promise<GetSales.Result> {
    const toISO = (date: string): string => new Date(date).toISOString()
    const filterByDate = `creationDate:[${toISO(params.startDate)} TO ${toISO(params.endDate)}]`

    const { data, error } = await this.httpClient.request({
      method: 'GET',
      baseUrl: params.integrationUrl,
      headers: {
        'X-VTEX-API-AppKey': params.publicKey as string,
        'X-VTEX-API-AppToken': params.privateKey,
      },
      url: `/api/oms/pvt/orders?${params.utmSource && `f_UtmSource=${params.utmSource}`}&page=${
        params.page
      }&per_page=${params.itemsPerPage}&f_creationDate=${filterByDate}&orderBy=creationDate,desc`,
    })

    if (error) throw new BadGatewayError(error)

    const items: GetSales.Sale[] = []

    const getSaleStatus = (status: string) => {
      const SalesStatusType = {
        invoiced: 'paid',
        'payment-pending': 'awaiting_payment',
        canceled: 'canceled',
        handling: 'handling',
      }
      return SalesStatusType[status]
    }

    let totalAmount = 0

    if (data.list.length) {
      for (let i in data.list) {
        const status = getSaleStatus(data.list[i].status)
        const paymentMethod = getPaymentMethod(data.list[i].paymentNames)
        items.push({
          date: data.list[i].creationDate,
          status,
          value: data.list[i].totalValue,
          externalOrderId: data.list[i].orderId,
          paymentMethod,
        })

        totalAmount += data.list[i].totalValue
        calcTotalByPaymentStatus(status)
        calcTotalByPaymentMethod(paymentMethod)
      }
    }

    return {
      ...getTotalByPaymentStatus(),
      totalCount: items.length,
      totalAmount,
      totalByPaymentMethod: getTotalByPaymentMethod(),
      pagination: {
        hasNext: data.paging.pages > data.paging.currentPage,
        currentPage: data.paging.currentPage,
        itemsPerPage: data.paging.perPage,
      },
      items,
    }
  }
}
