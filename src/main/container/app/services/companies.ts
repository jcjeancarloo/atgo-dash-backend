import { container } from 'tsyringe'

import {
  CreateCompanyService,
  DeleteCompanyService,
  GetCompanyService,
  ListCompaniesService,
  UpdateCompanyService,
} from '@/app/services/company'

import { CompanyRepository } from '@/app/protocols/db/repositories/companies'

import {
  CreateCompanyUsecase,
  DeleteCompanyUsecase,
  GetCompanyUsecase,
  ListCompaniesUsecase,
  UpdateCompanyUsecase,
} from '@/domain/usecases/company'

import { CompanyPrismaRepository } from '@/infra/db/prisma/repositories/company-prisma-repository'

container.register<CreateCompanyUsecase>('CreateCompanyUsecase', {
  useClass: CreateCompanyService,
})
container.register<ListCompaniesUsecase>('ListCompaniesUsecase', {
  useClass: ListCompaniesService,
})
container.register<GetCompanyUsecase>('GetCompanyUsecase', {
  useClass: GetCompanyService,
})
container.register<UpdateCompanyUsecase>('UpdateCompanyUsecase', {
  useClass: UpdateCompanyService,
})
container.register<DeleteCompanyUsecase>('DeleteCompanyUsecase', {
  useClass: DeleteCompanyService,
})

container.register<CompanyRepository>('CompanyRepository', {
  useClass: CompanyPrismaRepository,
})

export default container
