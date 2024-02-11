import { type ListPlatformUsecase } from '@/domain/usecases/platform'
import { ok } from '@/presentation/helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { inject, injectable } from 'tsyringe'
import * as yup from 'yup'

type ValidHttpRequest = {
  query: {}
}

@injectable()
export class ListPlatformController implements Controller {
  constructor(@inject('ListPlatformUsecase') private readonly listPlatform: ListPlatformUsecase) {}

  async validate(httpRequest: HttpRequest): Promise<ValidHttpRequest> {
    return yup
      .object({
        query: yup.object({}),
      })
      .validate(httpRequest, { abortEarly: false })
  }

  async execute({ query }: HttpRequest): Promise<HttpResponse> {
    const platforms = await this.listPlatform.perform(query)
    return ok(platforms)
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.execute(await this.validate(httpRequest))
  }
}
