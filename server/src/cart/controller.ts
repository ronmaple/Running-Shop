import { Response, Request } from 'express'
import carts from './model'
import productModel from '../product/model' // need better architecture

interface RequestHandler {
  (req: Request, res: Response): Promise<Response | any>
}

export const getCart: RequestHandler = async (req, res) => {
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

const validateCartItem = async (item: CartItem) => {
  // Need a better architecture for data access
  if (!item) {
    throw new Error('Cart Item required')
  }
  // if (!item.productId) {
  //   throw new Error('Valid CartItem.productId is required')
  // }
  if (!(await productModel.findById(item.productId))) {
    throw new Error('Valid CartItem.productId is required')
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
  // const body = req.body
  try {
    // await validateCartItems(body.items)
    const cartData: Cart = {
      items: [],
      totalPrice: 0,
    }
    const cart = await carts.create(cartData)
    return res.status(201).send(cart)
  } catch (err) {
    // TODO generic error handler
    console.error(err)
    return res.sendStatus(500)
  }
}

export const addToCart: RequestHandler = async (req, res) => {
  const id = req.params.id
  const body = req.body
  try {
    const cart = await carts.findOne({ _id: id })
    if (!cart) {
      throw new Error('Not Found')
    }
    await validateCartItem(body)
    const product = await productModel.findOne({
      _id: body.productId,
    })

    if (!product) {
      throw new Error('Product not found')
    }

    cart.items.push({
      productId: product._id,
      description: product.description,
      title: product.title,
      quantity: 1,
      pricePerUnit: product.salePrice,
    })

    await cart.save()
    res.send(cart)
  } catch (err) {
    // TODO generic error handler
    console.error(err)
    res.sendStatus(500)
  }
}

export const updateCartItem: RequestHandler = async (req, res) => {
  const id = req.params.id
  const body = req.body
  try {
    res.send('TODO')
  } catch (err) {
    // TODO generic error handler
    console.error(err)
    res.sendStatus(500)
  }
}

export const removeCartItem: RequestHandler = async (req, res) => {
  const id = req.params.id
  const body = req.body
  try {
    res.send('TODO')
  } catch (err) {
    // TODO generic error handler
    console.error(err)
    res.sendStatus(500)
  }
}


// export const update: RequestHandler = async (req, res) => {
//   const id = req.params.id
//   const body = req.body
//   try {
//     await carts.findOneAndUpdate({ _id: id }, body)
//     const cart = await carts.findOne({ _id: id })
//     res.send(cart)
//   } catch (err) {
//     // TODO generic error handler
//     console.error(err)
//     res.sendStatus(500)
//   }
// }


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
