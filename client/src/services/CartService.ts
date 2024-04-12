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

  getCart(cartId: string) {
    return this._get(`/${cartId}`)
  }
  updateCartItem(
    cartId: string,
    itemId: string,
    payload: {
      quantity: number
    }
  ) {
    return this._put(`/${cartId}/items/${itemId}`, payload)
  }
  removeCartItem(cartId: string, itemId: string) {
    return this._delete(`/${cartId}/items/${itemId}`)
  }
}

export default new CartService({
  baseURL: `${apiURL}/carts`,
})
