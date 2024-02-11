import { LoginController } from '@/presentation/controllers'
import { container } from 'tsyringe'

container.register<LoginController>('LoginController', {
  useClass: LoginController,
})

export default container
