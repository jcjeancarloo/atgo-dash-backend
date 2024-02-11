import type * as CompanyRepository from '@/app/protocols/db/repositories/companies'
import { type ListCompaniesUsecase } from '@/domain/usecases/company'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListCompaniesService implements ListCompaniesUsecase {
  constructor(
    @inject('CompanyRepository')
    private readonly companyRepository: CompanyRepository.List,
  ) {}
  async perform(params: ListCompaniesUsecase.Params): Promise<ListCompaniesUsecase.Result> {
    return this.companyRepository.list(params)
  }
}
