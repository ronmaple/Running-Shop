import axios from './utils/axios'
import { getToken } from './utils/auth'
import productModel, { Product } from '../src/product/model'

describe('carts.test.ts', () => {
  let token
  let headers: any = {}
  let products: Product[] = []

  beforeAll(async () => {
    const product = {
      title: 'Test Product',
      description: 'This is a test product',
      unitPrice: 100,
      salePrice: 90,
      inventory: 10,
      images: ['http://example.com/image.jpg'],
    }
    const response = await axios.post('/products', product, { headers })
    products.push(response.data)
  })
  afterAll(async () => {
    await axios.delete(`/products/${products[0].id}`)
  })

  // Changed the flow. Create cart no longer needs these. Will leave commented until fully fleshed out
  it('should create a cart on POST /carts', async () => {
    const response = await axios.post('/carts', {}, { headers })
    expect(response.status).toEqual(201)
    expect(response.data.items.length).toEqual(0)
  })

  it.skip('should get a cart by id on GET /carts/:id', async () => {
    const cart = {
      userId: 'someUserId', // Replace with actual user ID
      items: [],
      totalPrice: 100,
    }
    let response = await axios.post('/carts', cart, { headers })
    expect(response.status).toEqual(201)

    const id = response.data._id
    response = await axios.get(`/carts/${id}`, { headers })
    expect(response.status).toEqual(200)
    expect(response.data._id).toEqual(id)
    expect(response.data.userId).toEqual(cart.userId)
    expect(response.data.items.length).toEqual(1)
    expect(response.data.totalPrice).toEqual(cart.totalPrice)
  })

  it('should add a cart item on POST /cart/:id/items', async () => {
    const cart = {
      userId: 'someUserId', // Replace with actual user ID
    }
    let response = await axios.post('/carts', cart, { headers })
    expect(response.status).toEqual(201)

    const id = response.data.id
    const addItemPayload = {
      // TODO: shoe sizes, color, etc
      // For now, just do product
      productId: products[0].id,
    }

    response = await axios.post(`/carts/${id}/items`, addItemPayload, {
      headers,
    })
    expect(response.status).toEqual(200)
    expect(response.data.id).toEqual(id)
    expect(response.data.items.length).toEqual(1)
    expect(response.data.totalPrice).toEqual(products[0].salePrice)
  })

  it('should update an item in the cart on PUT /carts/:id/item/:id', async () => {
    const cart = {
      userId: 'someUserId', // Replace with actual user ID
    }
    let response = await axios.post('/carts', cart, { headers })
    expect(response.status).toEqual(201)

    const id = response.data.id
    const addItemPayload = {
      // TODO: shoe sizes, color, etc
      // For now, just do product
      productId: products[0].id,
    }
    response = await axios.post(`/carts/${id}/items`, addItemPayload, {
      headers,
    })
    expect(response.status).toEqual(200)
    expect(response.data.id).toEqual(id)
    expect(response.data.items.length).toEqual(1)
    expect(response.data.totalPrice).toEqual(products[0].salePrice)

    const item = response.data.items[0]
    const updateQtyPayload = {
      quantity: 2,
    }
    response = await axios.put(
      `/carts/${id}/items/${item.id}`,
      updateQtyPayload,
      {
        headers,
      }
    )
    expect(response.status).toEqual(200)
    expect(response.data.id).toEqual(id)
    expect(response.data.items.length).toEqual(1)
    expect(response.data.items[0].quantity).toEqual(2)
    expect(response.data.totalPrice).toEqual(products[0].salePrice * 2)
  })


  it('should delete a cart by id on DELETE /carts/:id', async () => {
    const cart = {
      userId: 'someUserId', // Replace with actual user ID
      items: [
        {
          title: 'Test Product',
          description: 'This is a test product',
          productId: 'someProductId', // Replace with actual product ID
          quantity: 2,
          pricePerUnit: 50,
        },
      ],
      totalPrice: 100,
    }
    let response = await axios.post('/carts', cart, { headers })
    expect(response.status).toEqual(201)

    const id = response.data._id
    response = await axios.delete(`/carts/${id}`, { headers })
    expect(response.status).toEqual(204)
  })
})
