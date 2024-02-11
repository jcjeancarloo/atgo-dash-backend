import PlatformProvider from '@/domain/platform'
import { type CreatePlatformCouponUsecase } from '@/domain/usecases/platform'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreatePlatformCouponService implements CreatePlatformCouponUsecase {
  constructor(@inject('PlatformProvider') private readonly platformProvider: PlatformProvider) {}

  async perform(
    params: CreatePlatformCouponUsecase.Params,
  ): Promise<CreatePlatformCouponUsecase.Result> {
    const coupon = await this.platformProvider.createCoupon(params)
    return coupon
  }
}
