import { Router } from 'express'
import { create } from './controller'

const route = Router()
route.post('/payment-intent', create)

export default route
