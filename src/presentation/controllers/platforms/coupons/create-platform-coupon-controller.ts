import { type CreatePlatformCouponUsecase } from '@/domain/usecases/platform'
import { created } from '@/presentation/helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { inject, injectable } from 'tsyringe'
import * as yup from 'yup'

type ValidHttpRequest = {
  body: {
    publicKey?: string
    privateKey: string
    platformId: string
    integrationUrl: string

    expirationAt: string
    code: string
    codeType: 'percentual' | 'amount'
    value: number
    campaignName: string
  }
}

@injectable()
export class CreatePlatformCouponController implements Controller {
  constructor(
    @inject('CreatePlatformCouponUsecase')
    private readonly createPlatformCoupon: CreatePlatformCouponUsecase,
  ) {}

  async validate(httpRequest: HttpRequest): Promise<ValidHttpRequest> {
    return yup
      .object({
        body: yup.object({
          privateKey: yup.string().required(),
          publicKey: yup.string(),
          platformId: yup.string().uuid().required(),
          integrationUrl: yup.string().required(),

          expirationAt: yup.string().required(),
          code: yup.string().required(),
          codeType: yup.string().oneOf(['percentual', 'amount']).required(),
          value: yup.number().required(),
          campaignName: yup.string().required(),
        }),
      })
      .validate(httpRequest, { abortEarly: false })
  }

  async execute({ body }: HttpRequest): Promise<HttpResponse> {
    const coupon = await this.createPlatformCoupon.perform(body)
    return created(coupon)
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.execute(await this.validate(httpRequest))
  }
}
