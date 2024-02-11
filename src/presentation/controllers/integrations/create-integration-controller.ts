import { type CreateIntegrationUsecase } from '@/domain/usecases/integrations'
import { created } from '@/presentation/helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { inject, injectable } from 'tsyringe'
import * as yup from 'yup'

type ValidHttpRequest = {
  body: {
    companyId: string
    platformId: string
    privateKey: string
    publicKey?: string
    url: string
  }
}

@injectable()
export class CreateIntegrationController implements Controller {
  constructor(
    @inject('CreateIntegrationUsecase')
    private readonly createIntegration: CreateIntegrationUsecase,
  ) {}

  async validate(httpRequest: HttpRequest): Promise<ValidHttpRequest> {
    return yup
      .object({
        body: yup.object({
          companyId: yup.string().uuid().required(),
          platformId: yup.string().uuid().required(),
          privateKey: yup.string().required(),
          publicKey: yup.string(),
          url: yup.string().required(),
        }),
      })
      .validate(httpRequest, { abortEarly: false })
  }

  async execute({ body }: HttpRequest): Promise<HttpResponse> {
    const integration = await this.createIntegration.perform(body)
    return created(integration)
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.execute(await this.validate(httpRequest))
  }
}
