import { Router } from 'express'
import { register, login, purge } from './controller'

const route = Router()
route.post('/signup', register)
route.post('/login', login)

// THIS IS FOR TESTING ONLY -- it won't be used in production setting
// if I have more time, I'll do this directly in jest
route.delete('/purge', purge)
// others:
// route.post('/logout', logout)
// route.put('/:id', update)
// route.delete('/:id', delete)

export default route