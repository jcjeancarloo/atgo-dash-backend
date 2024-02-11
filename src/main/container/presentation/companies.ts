import { container } from 'tsyringe'

import {
  CreateCompanyController,
  DeleteCompanyController,
  GetCompanyController,
  ListCompaniesController,
  UpdateCompanyController,
} from '@/presentation/controllers'

container.register<ListCompaniesController>('ListCompaniesController', {
  useClass: ListCompaniesController,
})
container.register<GetCompanyController>('GetCompanyController', {
  useClass: GetCompanyController,
})
container.register<CreateCompanyController>('CreateCompanyController', {
  useClass: CreateCompanyController,
})
container.register<UpdateCompanyController>('UpdateCompanyController', {
  useClass: UpdateCompanyController,
})
container.register<DeleteCompanyController>('DeleteCompanyController', {
  useClass: DeleteCompanyController,
})

export default container
