import { type GetPlatformSalesUsecase } from '@/domain/usecases/platform'
import { ok } from '@/presentation/helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { inject, injectable } from 'tsyringe'
import * as yup from 'yup'

type ValidHttpRequest = {
  body: {
    publicKey?: string
    privateKey: string
    platformId: string
    integrationUrl: string
  }
}

@injectable()
export class GetPlatformSalesController implements Controller {
  constructor(
    @inject('GetPlatformSalesUsecase')
    private readonly getPlatformSales: GetPlatformSalesUsecase,
  ) {}

  async validate(httpRequest: HttpRequest): Promise<ValidHttpRequest> {
    return yup
      .object({
        body: yup.object({
          privateKey: yup.string().required(),
          publicKey: yup.string(),
          platformId: yup.string().uuid().required(),
          integrationUrl: yup.string().required(),
        }),
      })
      .validate(httpRequest, { abortEarly: false })
  }

  async execute({ body }: HttpRequest): Promise<HttpResponse> {
    const sales = await this.getPlatformSales.perform(body)
    return ok(sales)
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.execute(await this.validate(httpRequest))
  }
}
