import { Router } from 'express'
import {
  // search,
  getCart,
  create,
  // update,
  addToCart,
  updateCartItem,
  removeCartItem,
  deleteProduct,
} from './controller'

const route = Router()
// route.get('/', search)

route.post('/', create)
route.get('/:id', getCart)
route.post('/:id/items', addToCart)
route.put('/:id/items/:itemId', updateCartItem)
route.delete('/:id/items/:itemId', removeCartItem)

// // TODOs
// route.post('/:id/cart/check-out')
// make delete cart
route.delete('/:id', deleteProduct)

export default route
