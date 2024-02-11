import { container } from 'tsyringe'

import {
  CreatePlatformCouponService,
  CreatePlatformService,
  DeletePlatformService,
  GetPlatformSalesService,
  GetPlatformService,
  ListPlatformService,
  UpdatePlatformService,
} from '@/app/services/platform'

import { PlatformRepository } from '@/app/protocols/db/repositories/platform'

import {
  CreatePlatformCouponUsecase,
  CreatePlatformUsecase,
  DeletePlatformUsecase,
  GetPlatformSalesUsecase,
  GetPlatformUsecase,
  ListPlatformUsecase,
  UpdatePlatformUsecase,
} from '@/domain/usecases/platform'
import { PlatformPrismaRepository } from '@/infra/db/prisma/repositories/platform-prisma-repository'

import PlatformProvider from '@/domain/platform'
import { PlatformStrategy } from '@/domain/platform/strategy'

container.register<CreatePlatformUsecase>('CreatePlatformUsecase', {
  useClass: CreatePlatformService,
})
container.register<ListPlatformUsecase>('ListPlatformUsecase', {
  useClass: ListPlatformService,
})
container.register<GetPlatformUsecase>('GetPlatformUsecase', {
  useClass: GetPlatformService,
})
container.register<UpdatePlatformUsecase>('UpdatePlatformUsecase', {
  useClass: UpdatePlatformService,
})
container.register<DeletePlatformUsecase>('DeletePlatformUsecase', {
  useClass: DeletePlatformService,
})

container.register<PlatformRepository>('PlatformRepository', {
  useClass: PlatformPrismaRepository,
})

container.register<CreatePlatformCouponUsecase>('CreatePlatformCouponUsecase', {
  useClass: CreatePlatformCouponService,
})

container.register<GetPlatformSalesUsecase>('GetPlatformSalesUsecase', {
  useClass: GetPlatformSalesService,
})

container.register<PlatformProvider>('PlatformProvider', {
  useClass: PlatformStrategy,
})

export default container
