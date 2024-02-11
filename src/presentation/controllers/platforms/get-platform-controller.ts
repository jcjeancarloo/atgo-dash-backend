import { type GetPlatformUsecase } from '@/domain/usecases/platform'
import { ok } from '@/presentation/helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { inject, injectable } from 'tsyringe'
import * as yup from 'yup'

type ValidHttpRequest = {
  params: {
    id: string
  }
}

@injectable()
export class GetPlatformController implements Controller {
  constructor(@inject('GetPlatformUsecase') private readonly getPlatform: GetPlatformUsecase) {}

  async validate(httpRequest: HttpRequest): Promise<ValidHttpRequest> {
    return yup
      .object({
        params: yup.object({
          id: yup.string().uuid().required(),
        }),
      })
      .validate(httpRequest, { abortEarly: false })
  }

  async execute({ params }: HttpRequest): Promise<HttpResponse> {
    const platform = await this.getPlatform.perform(params)
    return ok(platform)
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.execute(await this.validate(httpRequest))
  }
}
