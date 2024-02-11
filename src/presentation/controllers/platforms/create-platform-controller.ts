import { type CreatePlatformUsecase } from '@/domain/usecases/platform'
import { created } from '@/presentation/helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { inject, injectable } from 'tsyringe'
import * as yup from 'yup'

type ValidHttpRequest = {
  body: {
    name: string
  }
}

@injectable()
export class CreatePlatformController implements Controller {
  constructor(
    @inject('CreatePlatformUsecase')
    private readonly createPlatform: CreatePlatformUsecase,
  ) {}

  async validate(httpRequest: HttpRequest): Promise<ValidHttpRequest> {
    return yup
      .object({
        body: yup.object({
          name: yup.string().required(),
        }),
      })
      .validate(httpRequest, { abortEarly: false })
  }

  async execute({ body }: HttpRequest): Promise<HttpResponse> {
    const platform = await this.createPlatform.perform(body)
    return created(platform)
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.execute(await this.validate(httpRequest))
  }
}
