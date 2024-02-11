import { type HttpClient } from '@/app/protocols/http-client/http-client'
import axios from 'axios'

export class AxiosHttpClient implements HttpClient {
  async request<T = any>(
    args: HttpClient.Params,
    config?: HttpClient.Config,
  ): Promise<HttpClient.Result<T>> {
    try {
      let httpsAgent: any

      const result = await axios.request<T>({
        method: args.method,
        baseURL: args.baseUrl,
        url: args.url,
        headers: args.headers,
        params: args.params,
        data: args.data,
        httpsAgent,
      })

      return {
        statusCode: result.status,
        data: result.data,
      }
    } catch (error: any) {
      console.log('HTTP CLIENT ERROR')
      console.log({
        method: args.method,
        baseURL: args.baseUrl,
        url: args.url,
        statusCode: error.response?.status,
        data: error.response?.data,
      })
      if (error?.response === undefined || typeof error.response.status !== 'number') {
        throw error
      }

      return {
        statusCode: error.response.status,
        error: error.response.data,
      }
    }
  }
}
