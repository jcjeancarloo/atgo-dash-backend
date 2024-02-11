import { BadGatewayError } from '@/app/errors'
import { HttpClient } from '@/app/protocols/http-client/http-client'
import PlatformProvider from '@/domain/platform'
import { type CreateCoupon, type GetSales } from '@/domain/platform/methods'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ShopifyProvider implements PlatformProvider {
  constructor(@inject('HttpClient') private readonly httpClient: HttpClient) {}

  private async createPriceRule(params: CreateCoupon.Params): Promise<any> {
    const { data, error } = await this.httpClient.request({
      method: 'POST',
      baseUrl: params.integrationUrl,
      headers: {
        'X-Shopify-Access-Token': params.privateKey,
      },
      url: '/admin/api/2024-01/price_rules.json',
      data: {
        price_rule: {
          title: `Influcenter - ${params.code}`,
          value_type: params.codeType === 'amount' ? 'fixed_amount' : 'percentage',
          value: String(-params.value),
          starts_at: new Date().toISOString(),
          ends_at: params.expirationAt,
          customer_selection: 'all',
          target_type: 'line_item',
          target_selection: 'all',
          once_per_customer: true,
          allocation_method: 'across',
          allocation_limit: 1,
        },
      },
    })

    if (error) throw new BadGatewayError(error)

    return {
      id: data.price_rule.id,
      expirationAt: data.price_rule.ends_at,
      valueType: data.price_rule.value_type,
      value: data.price_rule.value,
    }
  }

  async createCoupon(params: CreateCoupon.Params): Promise<CreateCoupon.Result> {
    const priceRule = await this.createPriceRule(params)
    const { data, error } = await this.httpClient.request({
      method: 'POST',
      baseUrl: params.integrationUrl,
      headers: {
        'X-Shopify-Access-Token': params.privateKey,
      },
      url: `/admin/api/2024-01/price_rules/${priceRule.id}/discount_codes.json`,
      data: {
        discount_code: { code: params.code },
      },
    })

    if (error) throw new BadGatewayError(error)

    return {
      code: data.discount_code.code,
      codeType: priceRule.valueType === 'fixed_amount' ? 'amount' : 'percentual',
      isActive: true,
      value: Math.abs(Number(priceRule.value)), // Turn value to positive to keep the pattern,
      expirationAt: priceRule.expirationAt,
    }
  }

  async getSales(params: GetSales.Params): Promise<GetSales.Result> {
    throw new Error('Method not implemented.')
  }
}
