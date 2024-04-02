import HttpService, { HttpServiceConfig } from './HttpService'
import { apiURL } from '../configs/env'

class CartService extends HttpService {
  constructor(props: HttpServiceConfig) {
    super(props)
  }

  createCart() {
    return this._post('/', {})
  }

  addToCart(cartId: string, productId: string) {
    return this._post(`/${cartId}/items`, {
      productId,
    })
  }
}

export default new CartService({
  baseURL: `${apiURL}/carts`,
})
