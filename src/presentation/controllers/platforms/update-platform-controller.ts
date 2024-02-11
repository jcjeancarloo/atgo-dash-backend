import { type UpdatePlatformUsecase } from '@/domain/usecases/platform'
import { ok } from '@/presentation/helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { inject, injectable } from 'tsyringe'
import * as yup from 'yup'

type ValidHttpRequest = {
  params: {
    id: string
  }
  body: {
    name?: string
    image?: string
    isActive?: boolean
  }
}

@injectable()
export class UpdatePlatformController implements Controller {
  constructor(
    @inject('UpdatePlatformUsecase')
    private readonly updatePlatform: UpdatePlatformUsecase,
  ) {}

  async validate(httpRequest: HttpRequest): Promise<ValidHttpRequest> {
    return yup
      .object({
        params: yup.object({
          id: yup.string().uuid().required(),
        }),
        body: yup.object({
          name: yup.string(),
          image: yup.string(),
          isActive: yup.boolean(),
        }),
      })
      .validate(httpRequest, { abortEarly: false })
  }

  async execute({ params, body }: HttpRequest): Promise<HttpResponse> {
    const platform = await this.updatePlatform.perform({ ...params, ...body })
    return ok(platform)
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.execute(await this.validate(httpRequest))
  }
}
