import axios from './utils/axios'
import { getToken } from './utils/auth'

describe.skip('carts.test.ts', () => {
  let token
  let headers: any = {}
  beforeAll(async () => {
    await axios.delete('/auth/purge')
    token = await getToken()
    headers.Cookie = `jwt=${token}`
  })
  afterAll(async () => {
    await axios.delete('/auth/purge')
  })

  it('should create a cart on POST /carts', async () => {
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
    const response = await axios.post('/carts', cart, { headers })
    expect(response.status).toEqual(201)
    expect(response.data.userId).toEqual(cart.userId)
    expect(response.data.items.length).toEqual(1)
    expect(response.data.totalPrice).toEqual(cart.totalPrice)
  })

  it('should get a cart by id on GET /carts/:id', async () => {
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
    response = await axios.get(`/carts/${id}`, { headers })
    expect(response.status).toEqual(200)
    expect(response.data._id).toEqual(id)
    expect(response.data.userId).toEqual(cart.userId)
    expect(response.data.items.length).toEqual(1)
    expect(response.data.totalPrice).toEqual(cart.totalPrice)
  })

  it('should update a cart by id on PUT /carts/:id', async () => {
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
    const updatedCart = {
      ...cart,
      items: [
        ...cart.items,
        {
          title: 'Another Product',
          description: 'This is another test product',
          productId: 'anotherProductId', // Replace with actual product ID
          quantity: 1,
          pricePerUnit: 75,
        },
      ],
      totalPrice: 175,
    }
    response = await axios.put(`/carts/${id}`, updatedCart, { headers })
    expect(response.status).toEqual(200)
    expect(response.data._id).toEqual(id)
    expect(response.data.userId).toEqual(updatedCart.userId)
    expect(response.data.items.length).toEqual(2)
    expect(response.data.totalPrice).toEqual(updatedCart.totalPrice)
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
