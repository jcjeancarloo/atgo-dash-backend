import PlatformProvider from '@/domain/platform'
import { type GetPlatformSalesUsecase } from '@/domain/usecases/platform'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetPlatformSalesService implements GetPlatformSalesUsecase {
  constructor(@inject('PlatformProvider') private readonly ecommerceProvider: PlatformProvider) {}

  async perform(params: GetPlatformSalesUsecase.Params): Promise<GetPlatformSalesUsecase.Result> {
    const sales = await this.ecommerceProvider.getSales(params)
    return sales
  }
}
