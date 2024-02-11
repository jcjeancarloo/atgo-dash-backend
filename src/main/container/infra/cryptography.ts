import { Hasher, Signer } from '@/app/protocols/cryptography'
import { HASHER_SALT, JWT_EXPIRE_MS, JWT_SECRET } from '@/constants'
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography'

import { container } from 'tsyringe'

container.register<Hasher>('Hasher', {
  useClass: BcryptAdapter,
})

container.register('salt', {
  useValue: HASHER_SALT,
})

container.register<Signer>('Signer', {
  useClass: JwtAdapter,
})

container.register('secret', {
  useValue: JWT_SECRET,
})
container.register('expiresInSeconds', {
  useValue: JWT_EXPIRE_MS,
})

export default container
