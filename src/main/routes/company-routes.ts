import { adaptController } from '@/main/adapters'
import {
  CreateCompanyController,
  DeleteCompanyController,
  GetCompanyController,
  UpdateCompanyController,
} from '@/presentation/controllers'
import { ListCompaniesController } from '@/presentation/controllers/companies'

import { type Express } from 'express'

export default (router: Express): void => {
  router.get('/company', adaptController(ListCompaniesController.name))
  router.get('/company/:id', adaptController(GetCompanyController.name))
  router.post('/company', adaptController(CreateCompanyController.name))
  router.put('/company/:id', adaptController(UpdateCompanyController.name))
  router.delete('/company/:id', adaptController(DeleteCompanyController.name))
}
