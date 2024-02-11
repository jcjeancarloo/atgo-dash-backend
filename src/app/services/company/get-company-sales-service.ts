import { BadRequestError } from '@/app/errors'
import type * as CompanyRepository from '@/app/protocols/db/repositories/companies'
import PlatformProvider from '@/domain/platform'
import { type GetCompanySalesUsecase } from '@/domain/usecases/company'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetCompanySalesService implements GetCompanySalesUsecase {
  constructor(
    @inject('PlatformProvider') private readonly platformProvider: PlatformProvider,
    @inject('CompanyRepository')
    private readonly companyRepository: CompanyRepository.Get,
  ) {}

  async perform(params: GetCompanySalesUsecase.Params): Promise<GetCompanySalesUsecase.Result> {
    const company = await this.companyRepository.get(params)
    if (!company) throw new BadRequestError('Company  not found')

    return await this.platformProvider.getSales({
      platformId: company.platformId,
      privateKey: company.integration.privateKey,
      publicKey: company.integration.publicKey || undefined,
      integrationUrl: company.integration.url,
    })
  }
}
