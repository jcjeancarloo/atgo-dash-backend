import { BadGatewayError } from '@/app/errors'
import { HttpClient } from '@/app/protocols/http-client/http-client'
import PlatformProvider from '@/domain/platform'
import { type CreateCoupon, type GetSales } from '@/domain/platform/methods'
import { inject, injectable } from 'tsyringe'

@injectable()
export class MagazordProvider implements PlatformProvider {
  constructor(@inject('HttpClient') private readonly httpClient: HttpClient) {}

  private getAuth(privateKey: string, publicKey: string): string {
    return `Basic ${btoa(`${privateKey}:${publicKey}`)}`
  }

  private async getActiveStore(params: CreateCoupon.Params): Promise<number | undefined> {
    const {
      data: { data },
      error,
    } = await this.httpClient.request({
      method: 'GET',
      baseUrl: params.integrationUrl,
      headers: {
        Authorization: this.getAuth(params.privateKey, params.publicKey as string),
      },
      url: '/api/v2/site/loja',
    })

    if (error) throw new BadGatewayError(error)

    const activeStore = data.items.find((store) => store.ativo).id
    return activeStore
  }

  async createCoupon(params: CreateCoupon.Params): Promise<CreateCoupon.Result> {
    const store = await this.getActiveStore(params)
    if (!store) throw new BadGatewayError('Magazord store not available')

    const {
      data: { data },
      error,
    } = await this.httpClient.request({
      method: 'POST',
      baseUrl: params.integrationUrl,
      headers: {
        Authorization: this.getAuth(params.privateKey, params.publicKey as string),
      },
      url: '/api/v2/site/cupomDesconto',
      data: {
        codigo: params.code,
        tipoDesconto: params.codeType === 'amount' ? 1 : 2,
        validoDe: new Date().toISOString(),
        validoAte: params.expirationAt,
        valorDesconto: params.value,
        tipoLimite: 2, // One coupon per client
        descricao: 'influcenter',
        loja: store,
      },
    })

    if (error) throw new BadGatewayError(error)

    return {
      code: data.codigo,
      codeType: data.tipoDesconto === 1 ? 'amount' : 'percentual',
      expirationAt: data.validoAte,
      isActive: data.ativo,
      value: data.valorDesconto,
    }
  }

  async getSales(params: GetSales.Params): Promise<GetSales.Result> {
    throw new Error('Method not implemented.')
  }
}
