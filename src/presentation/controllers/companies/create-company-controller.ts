import { type CreateCompanyUsecase } from '@/domain/usecases/company'
import { created } from '@/presentation/helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { inject, injectable } from 'tsyringe'
import * as yup from 'yup'

type ValidHttpRequest = {
  body: {
    name: string
    document: string
    description?: string
    website?: string
    platformId: string
  }
}

@injectable()
export class CreateCompanyController implements Controller {
  constructor(
    @inject('CreateCompanyUsecase')
    private readonly createCompany: CreateCompanyUsecase,
  ) {}

  async validate(httpRequest: HttpRequest): Promise<ValidHttpRequest> {
    return yup
      .object({
        body: yup.object({
          name: yup.string().required(),
          document: yup.string().required(),
          description: yup.string(),
          website: yup.string(),
          platformId: yup.string().uuid().required(),
        }),
      })
      .validate(httpRequest, { abortEarly: false })
  }

  async execute({ body }: HttpRequest): Promise<HttpResponse> {
    const company = await this.createCompany.perform(body)
    return created(company)
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.execute(await this.validate(httpRequest))
  }
}
