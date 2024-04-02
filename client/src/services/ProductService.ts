import HttpService, { HttpServiceConfig } from './HttpService'
import { apiURL } from '../configs/env'

class ProductService extends HttpService {
  constructor(props: HttpServiceConfig) {
    super(props)
  }

  getById(id: string) {
    return this._get(`/${id}`)
  }
}

export default new ProductService({
  baseURL: `${apiURL}/products`,
})
