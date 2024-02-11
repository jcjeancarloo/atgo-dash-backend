import { type CreateCoupon } from '@/domain/platform/methods'

export namespace CreatePlatformCouponUsecase {
  export const name = 'CreatePlatformCouponUsecase'

  export type Params = CreateCoupon.Params
  export type Result = CreateCoupon.Result
}

export interface CreatePlatformCouponUsecase {
  perform: (
    params: CreatePlatformCouponUsecase.Params,
  ) => Promise<CreatePlatformCouponUsecase.Result>
}
