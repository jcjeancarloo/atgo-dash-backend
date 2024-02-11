import { GetApiStatusService } from '@/app/services/main'
import { GetApiStatusUsecase } from '@/domain/usecases/main'
import { container } from 'tsyringe'

container.register<GetApiStatusUsecase>('GetApiStatusUsecase', { useClass: GetApiStatusService })

export default container
