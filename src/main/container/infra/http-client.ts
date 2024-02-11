import { HttpClient } from '@/app/protocols/http-client/http-client'
import { AxiosHttpClient } from '@/infra/http-client'
import { container } from 'tsyringe'

container.register<HttpClient>('HttpClient', {
  useClass: AxiosHttpClient,
})

export default container
