import { BadRequestError } from '@/app/errors'
import type * as CompanyRepository from '@/app/protocols/db/repositories/companies'
import { type GetCompanyUsecase } from '@/domain/usecases/company'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetCompanyService implements GetCompanyUsecase {
  constructor(
    @inject('CompanyRepository')
    private readonly companyRepository: CompanyRepository.Get,
  ) {}
  async perform(params: GetCompanyUsecase.Params): Promise<GetCompanyUsecase.Result> {
    const company = await this.companyRepository.get(params)
    if (!company) throw new BadRequestError('Company  not found')
    return company
  }
}
