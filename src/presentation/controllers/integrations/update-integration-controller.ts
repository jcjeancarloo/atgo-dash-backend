import { type UpdateIntegrationUsecase } from '@/domain/usecases/integrations'
import { ok } from '@/presentation/helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { inject, injectable } from 'tsyringe'
import * as yup from 'yup'

type ValidHttpRequest = {
  params: {
    id: string
  }
  body: {
    privateKey?: string
    publicKey?: string
    url?: string
  }
}

@injectable()
export class UpdateIntegrationController implements Controller {
  constructor(
    @inject('UpdateIntegrationUsecase')
    private readonly updateIntegration: UpdateIntegrationUsecase,
  ) {}

  async validate(httpRequest: HttpRequest): Promise<ValidHttpRequest> {
    return yup
      .object({
        params: yup.object({
          id: yup.string().uuid().required(),
        }),
        body: yup.object({
          privateKey: yup.string(),
          publicKey: yup.string(),
          url: yup.string(),
        }),
      })
      .validate(httpRequest, { abortEarly: false })
  }

  async execute({ params, body }: HttpRequest): Promise<HttpResponse> {
    const integration = await this.updateIntegration.perform({ ...params, ...body })
    return ok(integration)
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.execute(await this.validate(httpRequest))
  }
}
