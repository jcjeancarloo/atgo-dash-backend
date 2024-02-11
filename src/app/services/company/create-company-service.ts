import type * as CompanyRepository from '@/app/protocols/db/repositories/companies'
import { type CreateCompanyUsecase } from '@/domain/usecases/company'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateCompanyService implements CreateCompanyUsecase {
  constructor(
    @inject('CompanyRepository')
    private readonly companyRepository: CompanyRepository.Create,
  ) {}
  async perform(params: CreateCompanyUsecase.Params): Promise<CreateCompanyUsecase.Result> {
    return this.companyRepository.create(params)
  }
}
