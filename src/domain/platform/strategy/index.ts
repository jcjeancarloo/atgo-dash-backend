import { BadRequestError } from '@/app/errors'
import { PlatformRepository } from '@/app/protocols/db/repositories/platform'

import { container, inject, injectable } from 'tsyringe'
import { GetSales } from '../methods'
import { ShopifyProvider, VtexProvider } from '../providers'

import PlatformProvider from '@/domain/platform'

@injectable()
export class PlatformStrategy implements PlatformProvider {
  constructor(
    @inject('PlatformRepository') private readonly platformRepository: PlatformRepository,
  ) {}

  private providerInstances: Record<string, PlatformProvider> = {
    Vtex: container.resolve(VtexProvider),
    Shopify: container.resolve(ShopifyProvider),
  }

  private getProviderInstance(name: string): PlatformProvider {
    const providerInstance = this.providerInstances[name]
    if (!providerInstance) throw new BadRequestError('Invalid provider name')

    return providerInstance
  }
  private async getProvider(platform: string): Promise<PlatformProvider> {
    const provider = await this.platformRepository.get({ id: platform })
    if (!provider || !provider.isActive) throw new BadRequestError('Platform not found or disabled')
    return this.getProviderInstance(provider.name)
  }

  async getSales(params: GetSales.Params): Promise<GetSales.Result> {
    const provider = await this.getProvider(params.platformId)
    return provider.getSales(params)
  }
}
