import { adaptController } from '@/main/adapters'
import {
  CreatePlatformController,
  DeletePlatformController,
  GetPlatformController,
  GetPlatformSalesController,
  ListPlatformController,
  UpdatePlatformController,
} from '@/presentation/controllers'

import { type Express } from 'express'

export default (router: Express): void => {
  router.get('/platform', adaptController(ListPlatformController.name))
  router.get('/platform/:id', adaptController(GetPlatformController.name))
  router.post('/platform', adaptController(CreatePlatformController.name))
  router.put('/platform/:id', adaptController(UpdatePlatformController.name))
  router.delete('/platform/:id', adaptController(DeletePlatformController.name))

  router.post('/platform/sales', adaptController(GetPlatformSalesController.name))
}
