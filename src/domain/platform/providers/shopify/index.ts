import { BadGatewayError } from '@/app/errors'
import { HttpClient } from '@/app/protocols/http-client/http-client'
import PlatformProvider from '@/domain/platform'
import { type GetSales } from '@/domain/platform/methods'
import { calcTotalByPaymentStatus, getTotalByPaymentStatus, toISO } from '@/utils'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ShopifyProvider implements PlatformProvider {
  constructor(@inject('HttpClient') private readonly httpClient: HttpClient) {}

  async getSales(params: GetSales.Params): Promise<GetSales.Result> {
    const { data, error } = await this.httpClient.request({
      method: 'GET',
      baseUrl: params.integrationUrl,
      headers: {
        'X-Shopify-Access-Token': params.privateKey,
      },
      url: `/admin/api/2024-01/orders.json?status=any&created_at_min=${toISO(
        params.startDate,
      )}&created_at_max=${toISO(params.endDate)}&limit=${
        params.itemsPerPage
      }&fields=id,created_at,order_number,source_name,current_total_price,financial_status,payment_gateway_names`,
    })

    if (error) throw new BadGatewayError(error)

    const items: GetSales.Sale[] = []

    const getSaleStatus = (status: string) => {
      const SalesStatusType = {
        paid: 'paid',
        pending: 'awaiting_payment',
        voided: 'canceled',
        authorized: 'handling',
      }
      return SalesStatusType[status]
    }

    let totalAmount = 0

    if (data.orders.length) {
      for (let i in data.orders) {
        const status = getSaleStatus(data.orders[i].financial_status)
        items.push({
          date: data.orders[i].created_at,
          status,
          value: Number(data.orders[i].current_total_price),
          externalOrderId: data.orders[i].id,
          paymentMethod: `Gateway - ${data.orders[i].payment_gateway_names[0]}`,
        })

        totalAmount += Number(data.orders[i].current_total_price)
        calcTotalByPaymentStatus(status)
      }
    }

    return {
      ...getTotalByPaymentStatus(),
      totalCount: items.length,
      totalAmount: Number(totalAmount.toFixed(2)),
      items,
    }
  }
}
