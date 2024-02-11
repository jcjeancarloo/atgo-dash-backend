import { type ListCompaniesUsecase } from '@/domain/usecases/company'
import { ok } from '@/presentation/helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { inject, injectable } from 'tsyringe'
import * as yup from 'yup'

type ValidHttpRequest = {
  query: {}
}

@injectable()
export class ListCompaniesController implements Controller {
  constructor(
    @inject('ListCompaniesUsecase') private readonly listCompanies: ListCompaniesUsecase,
  ) {}

  async validate(httpRequest: HttpRequest): Promise<ValidHttpRequest> {
    return yup
      .object({
        query: yup.object({}),
      })
      .validate(httpRequest, { abortEarly: false })
  }

  async execute({ query }: HttpRequest): Promise<HttpResponse> {
    const companies = await this.listCompanies.perform(query)
    return ok(companies)
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.execute(await this.validate(httpRequest))
  }
}
