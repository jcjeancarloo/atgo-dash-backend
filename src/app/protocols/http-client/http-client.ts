export namespace HttpClient {
  export const name = 'HttpClient'

  type Method =
    | 'get'
    | 'GET'
    | 'delete'
    | 'DELETE'
    | 'post'
    | 'POST'
    | 'put'
    | 'PUT'
    | 'patch'
    | 'PATCH'

  type HttpSuccess<T = any> = {
    data: T
    error?: never
    statusCode: number
  }

  type HttpError = {
    data?: never
    error: any
    statusCode: number
  }

  export type Params = {
    method: Method
    baseUrl?: string
    url?: string
    headers?: Record<string, string | number | boolean>
    params?: any
    data?: any
  }

  export type Config = {
    logProperties?: Record<string, any>
    sensitive?: {
      request?: {
        params?: boolean
        data?: boolean
      }
      response?: {
        data?: boolean
      }
    }
  }

  export type Result<T = any> = HttpSuccess<T> | HttpError
}

export interface HttpClient {
  request: <T = any>(
    params: HttpClient.Params,
    config?: HttpClient.Config,
  ) => Promise<HttpClient.Result<T>>
}
