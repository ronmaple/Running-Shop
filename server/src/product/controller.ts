import { Response, Request } from 'express'
import products from './model'

interface RequestHandler {
  (req: Request, res: Response): Promise<Response | any>
}

export const get: RequestHandler = async (req, res) => {
  const id = req.params.id
  try {
    const product = await products.findById(id)
    if (!product) {
      return res.status(404).send('Not Found')
    }
    res.send(product)
  } catch (err) {
    // TODO generic error handler
    console.error(err)
    res.status(500).send(err)
  }
}

export const search: RequestHandler = async (req, res) => {
  const query = req.query.q
  try {
    // alternatively, either pull all the products if no filter, or add filter if provided
    if (!query) {
      return res.status(404).send('Not Found')
    }
    const results = await products.find({ body: { $regex: query } })
    if (!results || !results.length) {
      return res.status(404).send('Not Found')
    }
    res.send({ data: results })
  } catch (err) {
    // TODO generic error handler
    console.error(err)
    res.status(500).send(err)
  }
}

export const create: RequestHandler = async (req, res) => {
  const body = req.body
  try {
    const product = await products.create(body)
    return res.status(201).send(product)
  } catch (err) {
    // TODO generic error handler
    console.error(err)
    return res.sendStatus(500)
  }
}

// I don't quite like findOneAndUpdate, but I'll
// keep it as it is since this doesn't need to be
// over-done in this type of repo
export const update: RequestHandler = async (req, res) => {
  const id = req.params.id
  const body = req.body
  try {
    await products.findOneAndUpdate({ _id: id }, body)
    const product = await products.findOne({ _id: id })
    res.send(product)
  } catch (err) {
    // TODO generic error handler
    console.error(err)
    res.sendStatus(500)
  }
}

export const deleteProduct: RequestHandler = async (req, res) => {
  const id = req.params.id
  try {
    await products.findOneAndRemove({ _id: id })
    res.status(204).send()
  } catch (err) {
    // TODO generic error handler
    console.error(err)
    res.sendStatus(500)
  }
}
