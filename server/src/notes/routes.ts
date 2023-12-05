import { Router } from 'express'
import { search, get, create, update, deleteNote } from './controller'

const route = Router()
route.get('/', search)
route.post('/', create)
route.get('/:id', get)
route.put('/:id', update)
route.delete('/:id', deleteNote)


export default route