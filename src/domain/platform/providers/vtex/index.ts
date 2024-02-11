import { BadGatewayError } from '@/app/errors'
import { HttpClient } from '@/app/protocols/http-client/http-client'
import PlatformProvider from '@/domain/platform'
import { type CreateCoupon, type GetSales } from '@/domain/platform/methods'
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

  private UTM_SOURCE_INFLUCENTER = 'influcenter'

  async createCoupon(params: CreateCoupon.Params): Promise<CreateCoupon.Result> {
    // Create coupon
    const { data, error } = await this.httpClient.request({
      method: 'POST',
      baseUrl: params.integrationUrl,
      headers: {
        'X-VTEX-API-AppKey': params.publicKey as string,
        'X-VTEX-API-AppToken': params.privateKey,
      },
      url: '/api/rnb/pvt/coupon',
      data: {
        utmSource: this.UTM_SOURCE_INFLUCENTER,
        utmCampaign: params.code.toUpperCase(),
        couponCode: params.code.toUpperCase(),
        isArchived: false,
        maxItemsPerClient: 99,
        expirationIntervalPerUse: '00:00:00',
      },
    })

    if (error) throw new BadGatewayError(error)

    // Create a promotion with created coupon related
    const responsePromotion = await this.httpClient.request({
      method: 'POST',
      baseUrl: params.integrationUrl,
      headers: {
        'X-VTEX-API-AppKey': params.publicKey as string,
        'X-VTEX-API-AppToken': params.privateKey,
      },
      url: '/api/rnb/pvt/calculatorconfiguration',
      data: {
        name: `INFLUCENTER | ${params.campaignName} | ${data.couponCode.toUpperCase()}`,
        type: 'regular',
        beginDateUtc: new Date().toISOString(),
        endDateUtc: params.expirationAt,
        isActive: true,
        isArchive: false,
        discountType: params.codeType === 'amount' ? 'nominal' : 'percentual',
        nominalDiscountValue: params.codeType === 'amount' ? params.value : null,
        percentualDiscountValue: params.codeType === 'percentual' ? params.value : null,
        origin: 'marketplace',
        utmSource: this.UTM_SOURCE_INFLUCENTER,
        coupon: [data.couponCode],
        cumulative: false,
      },
    })
    if (responsePromotion.error) throw new BadGatewayError(responsePromotion.error)

    return {
      code: data.couponCode.toUpperCase(),
      codeType: responsePromotion.data.discountType === 'nominal' ? 'amount' : 'percentual',
      expirationAt: params.expirationAt,
      isActive: responsePromotion.data.isActive && !responsePromotion.data.isArchived,
      value:
        responsePromotion.data.nominalDiscountValue ||
        responsePromotion.data.percentualDiscountValue,
    }
  }

  async getSales(params: GetSales.Params): Promise<GetSales.Result> {
    const { data, error } = await this.httpClient.request({
      method: 'GET',
      baseUrl: params.integrationUrl,
      headers: {
        'X-VTEX-API-AppKey': params.publicKey as string,
        'X-VTEX-API-AppToken': params.privateKey,
      },
      url: `/api/oms/pvt/orders?f_UtmSource=${this.UTM_SOURCE_INFLUCENTER}&page=10&per_page=100&orderBy=creationDate,asc`,
    })

    if (error) throw new BadGatewayError(error)

    const items: GetSales.Sale[] = []

    const getSaleStatus = (status: string) => {
      const SalesStatusType = {
        invoiced: 'paid',
        'payment-pending': 'awaiting_payment',
        canceled: 'canceled',
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
      items,
    }
  }
}
