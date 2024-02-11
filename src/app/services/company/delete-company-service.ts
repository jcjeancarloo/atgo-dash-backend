import { BadRequestError } from '@/app/errors'
import type * as CompanyRepository from '@/app/protocols/db/repositories/companies'
import { type DeleteCompanyUsecase } from '@/domain/usecases/company'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteCompanyService implements DeleteCompanyUsecase {
  constructor(
    @inject('CompanyRepository')
    private readonly companyRepository: CompanyRepository.Get & CompanyRepository.Delete,
  ) {}
  async perform(params: DeleteCompanyUsecase.Params): Promise<DeleteCompanyUsecase.Result> {
    const company = await this.companyRepository.get({ id: params.id })
    if (!company) throw new BadRequestError('Company not found')

    return this.companyRepository.delete(params)
  }
}
