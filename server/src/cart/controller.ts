import { Response, Request } from 'express'
import carts from './model'
import productModel from '../product/model' // need better architecture

interface RequestHandler {
  (req: Request, res: Response): Promise<Response | any>
}

export const get: RequestHandler = async (req, res) => {
  const id = req.params.id
  try {
    const cart = await carts.findById(id)
    if (!cart) {
      return res.status(404).send('Not Found')
    }
    res.send(cart)
  } catch (err) {
    // TODO generic error handler
    console.error(err)
    res.status(500).send(err)
  }
}

// todo: pagination, generic response handler {data, total, cursor}
// todo: Response Interface
// export const search: RequestHandler = async (req, res) => {
//   const query = req.query.q
//   try {
//     let data
//     if (!query) {
//       data = await carts.find()
//     } else {
//       data = await carts.find({ body: { $regex: query } })
//     }
//     if (!data || !data.length) {
//       return res.status(404).send('Not Found')
//     }
//     res.send({ data, total: data.length, cursor: null })
//   } catch (err) {
//     // TODO generic error handler
//     console.error(err)
//     res.status(500).send(err)
//   }
// }

const validateCartItems = async (cartItems: CartItem[]) => {
  // Need a better architecture for data access
  if (!Array.isArray(cartItems) || cartItems.length <= 0) {
    throw new Error('Cart Items required')
  }
  for (const item of cartItems) {
    if (!item.productId) {
      throw new Error('Valid CartItem.productId is required')
    }
    if (!(await productModel.findById(item.productId))) {
      throw new Error('Valid CartItem.productId is required')
    }
  }
}

type CartItem = {
  id?: string
  title: string
  description: string
  productId: string
  quantity: number
  pricePerUnit: number
}

type Cart = {
  id?: string
  items: CartItem[]
  totalPrice: number
}

// TODO: proper validation
// TODO proper architecture to separate concerns
export const create: RequestHandler = async (req, res) => {
  const body = req.body
  try {
    await validateCartItems(body.items)
    const cartData: Cart = {
      items: [],
      totalPrice: 0,
    }
    for (const item of body.items) {
      const product = await productModel.findById(item.productId)
      if (product) {
        cartData.items.push({
          description: product.description || '',
          title: product.title || '',
          quantity: item.quantity,
          // @ts-ignore
          productId: product._id || '',
          pricePerUnit: product.salePrice,
        })
        cartData.totalPrice += item.quantity * product.salePrice
      }
    }
    const cart = await carts.create(cartData)
    return res.status(201).send(cart)
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
    await carts.findOneAndUpdate({ _id: id }, body)
    const cart = await carts.findOne({ _id: id })
    res.send(cart)
  } catch (err) {
    // TODO generic error handler
    console.error(err)
    res.sendStatus(500)
  }
}

export const deleteProduct: RequestHandler = async (req, res) => {
  const id = req.params.id
  try {
    await carts.findOneAndRemove({ _id: id })
    res.status(204).send()
  } catch (err) {
    // TODO generic error handler
    console.error(err)
    res.sendStatus(500)
  }
}
