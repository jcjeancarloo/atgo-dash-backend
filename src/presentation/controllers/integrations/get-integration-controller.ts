import { type GetIntegrationUsecase } from '@/domain/usecases/integrations'
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
export class GetIntegrationController implements Controller {
  constructor(
    @inject('GetIntegrationUsecase') private readonly getIntegration: GetIntegrationUsecase,
  ) {}

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
    const integration = await this.getIntegration.perform(params)
    return ok(integration)
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.execute(await this.validate(httpRequest))
  }
}
