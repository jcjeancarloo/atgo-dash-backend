import { LoginService } from '@/app/services/authentication'
import { LoginUsecase } from '@/domain/usecases/authentication'
import { container } from 'tsyringe'

container.register<LoginUsecase>('LoginUsecase', { useClass: LoginService })

export default container
