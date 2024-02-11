export namespace CreateCoupon {
  type Coupon = {
    expirationAt: string
    code: string
    codeType: 'percentual' | 'amount'
    value: number
    isActive: boolean
  }

  export type Params = {
    privateKey: string
    publicKey?: string
    integrationUrl: string
    platformId: string

    expirationAt: string
    code: string
    codeType: 'percentual' | 'amount'
    value: number
    campaignName: string
  }
  export type Result = Coupon
}

export interface CreateCoupon {
  createCoupon(params: CreateCoupon.Params): Promise<CreateCoupon.Result>
}
