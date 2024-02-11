import { type GetCompanySalesUsecase } from '@/domain/usecases/company'
import { ok } from '@/presentation/helpers/http-helper'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'
import { inject, injectable } from 'tsyringe'
import * as yup from 'yup'

type ValidHttpRequest = {
  query: {
    startDate: string
    endDate: string
    utmSource?: string
    page: number
    itemsPerPage: number
  }
  params: {
    id: string
  }
}

@injectable()
export class GetCompanySalesController implements Controller {
  constructor(
    @inject('GetCompanySalesUsecase')
    private readonly getCompanySales: GetCompanySalesUsecase,
  ) {}

  async validate(httpRequest: HttpRequest): Promise<ValidHttpRequest> {
    return yup
      .object({
        params: yup.object({
          id: yup.string().required(),
        }),
        query: yup.object({
          startDate: yup
            .string()
            .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in the format yyyy-mm-dd')
            .required(),
          endDate: yup
            .string()
            .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in the format yyyy-mm-dd')
            .required(),
          utmSource: yup.string(),
          page: yup.number().required(),
          itemsPerPage: yup.number().required(),
        }),
      })
      .validate(httpRequest, { abortEarly: false })
  }

  async execute({ params, query }: HttpRequest): Promise<HttpResponse> {
    const sales = await this.getCompanySales.perform({ ...params, query })
    return ok(sales)
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.execute(await this.validate(httpRequest))
  }
}
