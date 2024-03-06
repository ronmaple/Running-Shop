import { Router } from 'express'
import {
  // search,
  get,
  create,
  update,
  deleteProduct,
} from './controller'

const route = Router()
// route.get('/', search)
route.post('/', create)
route.get('/:id', get)
route.put('/:id', update)
route.delete('/:id', deleteProduct)

export default route
