import axios from './utils/axios'
import { getToken } from './utils/auth'

describe.skip('orders.test.ts', () => {
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

  it('should create an order on POST /orders', async () => {
    const order = {
      userId: 'someUserId', // Replace with actual user ID
      cartId: 'someCartId', // Replace with actual cart ID
      items: [
        {
          title: 'Test Product',
          description: 'This is a test product',
          productId: 'someProductId', // Replace with actual product ID
          quantity: 2,
          pricePerUnit: 50,
        },
      ],
      tax: 10,
      totalPrice: 110,
    }
    const response = await axios.post('/orders', order, { headers })
    expect(response.status).toEqual(201)
    expect(response.data.userId).toEqual(order.userId)
    expect(response.data.cartId).toEqual(order.cartId)
    expect(response.data.items.length).toEqual(1)
    expect(response.data.tax).toEqual(order.tax)
    expect(response.data.totalPrice).toEqual(order.totalPrice)
  })

  it('should get an order by id on GET /orders/:id', async () => {
    const order = {
      userId: 'someUserId', // Replace with actual user ID
      cartId: 'someCartId', // Replace with actual cart ID
      items: [
        {
          title: 'Test Product',
          description: 'This is a test product',
          productId: 'someProductId', // Replace with actual product ID
          quantity: 2,
          pricePerUnit: 50,
        },
      ],
      tax: 10,
      totalPrice: 110,
    }
    let response = await axios.post('/orders', order, { headers })
    expect(response.status).toEqual(201)

    const id = response.data._id
    response = await axios.get(`/orders/${id}`, { headers })
    expect(response.status).toEqual(200)
    expect(response.data._id).toEqual(id)
    expect(response.data.userId).toEqual(order.userId)
    expect(response.data.cartId).toEqual(order.cartId)
    expect(response.data.items.length).toEqual(1)
    expect(response.data.tax).toEqual(order.tax)
    expect(response.data.totalPrice).toEqual(order.totalPrice)
  })

  it('should update an order by id on PUT /orders/:id', async () => {
    const order = {
      userId: 'someUserId', // Replace with actual user ID
      cartId: 'someCartId', // Replace with actual cart ID
      items: [
        {
          title: 'Test Product',
          description: 'This is a test product',
          productId: 'someProductId', // Replace with actual product ID
          quantity: 2,
          pricePerUnit: 50,
        },
      ],
      tax: 10,
      totalPrice: 110,
    }
    let response = await axios.post('/orders', order, { headers })
    expect(response.status).toEqual(201)

    const id = response.data._id
    const updatedOrder = {
      ...order,
      items: [
        ...order.items,
        {
          title: 'Another Product',
          description: 'This is another test product',
          productId: 'anotherProductId', // Replace with actual product ID
          quantity: 1,
          pricePerUnit: 75,
        },
      ],
      tax: 15,
      totalPrice: 185,
    }
    response = await axios.put(`/orders/${id}`, updatedOrder, { headers })
    expect(response.status).toEqual(200)
    expect(response.data._id).toEqual(id)
    expect(response.data.userId).toEqual(updatedOrder.userId)
    expect(response.data.cartId).toEqual(updatedOrder.cartId)
    expect(response.data.items.length).toEqual(2)
    expect(response.data.tax).toEqual(updatedOrder.tax)
    expect(response.data.totalPrice).toEqual(updatedOrder.totalPrice)
  })

  it('should delete an order by id on DELETE /orders/:id', async () => {
    const order = {
      userId: 'someUserId', // Replace with actual user ID
      cartId: 'someCartId', // Replace with actual cart ID
      items: [
        {
          title: 'Test Product',
          description: 'This is a test product',
          productId: 'someProductId', // Replace with actual product ID
          quantity: 2,
          pricePerUnit: 50,
        },
      ],
      tax: 10,
      totalPrice: 110,
    }
    let response = await axios.post('/orders', order, { headers })
    expect(response.status).toEqual(201)

    const id = response.data._id
    response = await axios.delete(`/orders/${id}`, { headers })
    expect(response.status).toEqual(204)
  })
})
