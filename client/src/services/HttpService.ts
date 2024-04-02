import axiosLib, { AxiosInstance } from 'axios'

export interface HttpServiceConfig {
  baseURL: string
}

interface IHttpService {
  // _get(url: string): Promise<any>
  // _post(url: string, payload: any): Promise<any>
  // _put(url: string, payload: any): Promise<any>
  // _delete(url: string): Promise<any>
}

class HttpService implements IHttpService {
  private axios: AxiosInstance
  private headers: Record<string, string> = {}

  constructor({ baseURL }: HttpServiceConfig) {
    this.axios = axiosLib.create({
      baseURL,
    })
    this.setAuthorizationHeader()
  }

  private setAuthorizationHeader() {
    const token = localStorage.getItem('token')
    if (token) {
      this.setHeader('Authorization', `Bearer ${token}`)
    }
  }

  setHeader(key: string, value: string) {
    this.headers[key] = value
  }

  removeHeader(key: string) {
    delete this.headers[key]
  }

  onError(error: Error) {
    if (axiosLib.isAxiosError(error)) {
      const { response } = error
      throw new Error(response?.data?.message || 'An error occurred')
    } else {
      throw new Error(error.message)
    }
  }

  private async onRequest(request: Promise<any>) {
    try {
      const { data } = await request
      return data
    } catch (error: any) {
      this.onError(error)
    }
  }

  protected _get(url: string): Promise<any> {
    return this.onRequest(this.axios.get(url, { headers: this.headers }))
  }

  protected _post(url: string, payload: any): Promise<any> {
    return this.onRequest(
      this.axios.post(url, payload, { headers: this.headers })
    )
  }

  protected _put(url: string, payload: any): Promise<any> {
    return this.onRequest(
      this.axios.put(url, payload, { headers: this.headers })
    )
  }

  protected _delete(url: string): Promise<any> {
    return this.onRequest(this.axios.get(url, { headers: this.headers }))
  }
}

export default HttpService
