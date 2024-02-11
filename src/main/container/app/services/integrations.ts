import { container } from 'tsyringe'

import {
  CreateIntegrationService,
  DeleteIntegrationService,
  GetIntegrationService,
  ListIntegrationService,
  UpdateIntegrationService,
} from '@/app/services/integrations'

import { IntegrationRepository } from '@/app/protocols/db/repositories/integration'

import {
  CreateIntegrationUsecase,
  DeleteIntegrationUsecase,
  GetIntegrationUsecase,
  ListIntegrationUsecase,
  UpdateIntegrationUsecase,
} from '@/domain/usecases/integrations'

import { IntegrationPrismaRepository } from '@/infra/db/prisma/repositories/integration-prisma-repository'

container.register<CreateIntegrationUsecase>('CreateIntegrationUsecase', {
  useClass: CreateIntegrationService,
})
container.register<ListIntegrationUsecase>('ListIntegrationUsecase', {
  useClass: ListIntegrationService,
})
container.register<GetIntegrationUsecase>('GetIntegrationUsecase', {
  useClass: GetIntegrationService,
})
container.register<UpdateIntegrationUsecase>('UpdateIntegrationUsecase', {
  useClass: UpdateIntegrationService,
})
container.register<DeleteIntegrationUsecase>('DeleteIntegrationUsecase', {
  useClass: DeleteIntegrationService,
})

container.register<IntegrationRepository>('IntegrationRepository', {
  useClass: IntegrationPrismaRepository,
})

export default container
