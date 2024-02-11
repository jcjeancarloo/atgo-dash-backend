import { type ListIntegrationUsecase } from '@/domain/usecases/integrations'
import { ok } from '@/presentation/helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { inject, injectable } from 'tsyringe'
import * as yup from 'yup'

type ValidHttpRequest = {
  query: {}
}

@injectable()
export class ListIntegrationController implements Controller {
  constructor(
    @inject('ListIntegrationUsecase') private readonly listIntegrations: ListIntegrationUsecase,
  ) {}

  async validate(httpRequest: HttpRequest): Promise<ValidHttpRequest> {
    return yup
      .object({
        query: yup.object({}),
      })
      .validate(httpRequest, { abortEarly: false })
  }

  async execute({ query }: HttpRequest): Promise<HttpResponse> {
    const companies = await this.listIntegrations.perform(query)
    return ok(companies)
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.execute(await this.validate(httpRequest))
  }
}
