import { type UpdateCompanyUsecase } from '@/domain/usecases/company'
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
    description?: string
    website?: string
    isActive?: boolean
  }
}

@injectable()
export class UpdateCompanyController implements Controller {
  constructor(
    @inject('UpdateCompanyUsecase')
    private readonly updateCompany: UpdateCompanyUsecase,
  ) {}

  async validate(httpRequest: HttpRequest): Promise<ValidHttpRequest> {
    return yup
      .object({
        params: yup.object({
          id: yup.string().uuid().required(),
        }),
        body: yup.object({
          name: yup.string(),
          description: yup.string(),
          website: yup.string(),
          isActive: yup.boolean(),
        }),
      })
      .validate(httpRequest, { abortEarly: false })
  }

  async execute({ params, body }: HttpRequest): Promise<HttpResponse> {
    const company = await this.updateCompany.perform({ ...params, ...body })
    return ok(company)
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.execute(await this.validate(httpRequest))
  }
}
