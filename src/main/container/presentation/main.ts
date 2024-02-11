import { GetApiStatusController } from '@/presentation/controllers/main'
import { container } from 'tsyringe'

container.register<GetApiStatusController>('GetApiStatusController', {
  useClass: GetApiStatusController,
})

export default container
