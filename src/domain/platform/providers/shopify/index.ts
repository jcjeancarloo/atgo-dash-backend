import { HttpClient } from '@/app/protocols/http-client/http-client'
import PlatformProvider from '@/domain/platform'
import { type GetSales } from '@/domain/platform/methods'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ShopifyProvider implements PlatformProvider {
  constructor(@inject('HttpClient') private readonly httpClient: HttpClient) {}

  async getSales(params: GetSales.Params): Promise<GetSales.Result> {
    throw new Error('Method not implemented.')
  }
}
