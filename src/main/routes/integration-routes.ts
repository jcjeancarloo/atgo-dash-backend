import { adaptController } from '@/main/adapters'
import {
  CreateIntegrationController,
  DeleteIntegrationController,
  GetIntegrationController,
  ListIntegrationController,
  UpdateIntegrationController,
} from '@/presentation/controllers'

import { type Express } from 'express'

export default (router: Express): void => {
  router.get('/integration', adaptController(ListIntegrationController.name))
  router.get('/integration/:id', adaptController(GetIntegrationController.name))
  router.post('/integration', adaptController(CreateIntegrationController.name))
  router.put('/integration/:id', adaptController(UpdateIntegrationController.name))
  router.delete('/integration/:id', adaptController(DeleteIntegrationController.name))
}
