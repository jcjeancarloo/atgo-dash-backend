import { container } from 'tsyringe'

import {
  CreateIntegrationController,
  DeleteIntegrationController,
  GetIntegrationController,
  ListIntegrationController,
  UpdateIntegrationController,
} from '@/presentation/controllers'

container.register<ListIntegrationController>('ListIntegrationController', {
  useClass: ListIntegrationController,
})
container.register<GetIntegrationController>('GetIntegrationController', {
  useClass: GetIntegrationController,
})
container.register<CreateIntegrationController>('CreateIntegrationController', {
  useClass: CreateIntegrationController,
})
container.register<UpdateIntegrationController>('UpdateIntegrationController', {
  useClass: UpdateIntegrationController,
})
container.register<DeleteIntegrationController>('DeleteIntegrationController', {
  useClass: DeleteIntegrationController,
})

export default container
