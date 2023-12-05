import { Router } from 'express'
import { getHealth } from './controller'

const route = Router()
route.get('/health', getHealth)

export default route