import { PlatformKind } from '@prisma/client'

export namespace Create {
  export type Params = PlatformKind

  export type Result = PlatformKind
}

export interface Create {
  create: (data: Create.Params) => Promise<Create.Result>
}
