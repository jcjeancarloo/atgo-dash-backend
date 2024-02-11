import { container } from 'tsyringe'

import {
  CreatePlatformController,
  CreatePlatformCouponController,
  DeletePlatformController,
  GetPlatformController,
  GetPlatformSalesController,
  ListPlatformController,
  UpdatePlatformController,
} from '@/presentation/controllers'

container.register<ListPlatformController>('ListPlatformController', {
  useClass: ListPlatformController,
})
container.register<GetPlatformController>('GetPlatformController', {
  useClass: GetPlatformController,
})
container.register<CreatePlatformController>('CreatePlatformController', {
  useClass: CreatePlatformController,
})
container.register<UpdatePlatformController>('UpdatePlatformController', {
  useClass: UpdatePlatformController,
})
container.register<DeletePlatformController>('DeletePlatformController', {
  useClass: DeletePlatformController,
})

container.register<CreatePlatformCouponController>('CreatePlatformCouponController', {
  useClass: CreatePlatformCouponController,
})

container.register<GetPlatformSalesController>('GetPlatformSalesController', {
  useClass: GetPlatformSalesController,
})

export default container
