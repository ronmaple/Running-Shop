import axiosLib, { AxiosInstance } from 'axios'

interface HttpServiceConfig {
  baseURL: string
}

interface IHttpService {
  get(url: string): Promise<any>
  post(url: string, payload: any): Promise<any>
  put(url: string, payload: any): Promise<any>
  delete(url: string): Promise<any>
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

  async onRequest(request: Promise<any>) {
    try {
      const { data } = await request
      return data
    } catch (error: any) {
      this.onError(error)
    }
  }

  get(url: string): Promise<any> {
    return this.onRequest(this.axios.get(url, { headers: this.headers }))
  }

  post(url: string, payload: any): Promise<any> {
    return this.onRequest(
      this.axios.post(url, payload, { headers: this.headers })
    )
  }

  put(url: string, payload: any): Promise<any> {
    return this.onRequest(
      this.axios.put(url, payload, { headers: this.headers })
    )
  }

  delete(url: string): Promise<any> {
    return this.onRequest(this.axios.get(url, { headers: this.headers }))
  }
}

export default HttpService
