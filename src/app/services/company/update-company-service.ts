import { BadRequestError } from '@/app/errors'
import type * as CompanyRepository from '@/app/protocols/db/repositories/companies'
import { type UpdateCompanyUsecase } from '@/domain/usecases/company'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateCompanyService implements UpdateCompanyUsecase {
  constructor(
    @inject('CompanyRepository')
    private readonly companyRepository: CompanyRepository.Get & CompanyRepository.Update,
  ) {}
  async perform(params: UpdateCompanyUsecase.Params): Promise<UpdateCompanyUsecase.Result> {
    const company = await this.companyRepository.get({ id: params.id })
    if (!company) throw new BadRequestError('Company not found')

    return this.companyRepository.update(params)
  }
}
