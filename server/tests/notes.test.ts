import axios from './utils/axios'
import { getToken } from './utils/auth'

describe('products.test.ts', () => {
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

  it('should create product on POST /products', async () => {
    const params = {
      author: 'ron',
      body: 'Hello',
      completed: false,
    }
    const response = await axios.post('/products', params, { headers })
    expect(response.data.author).toEqual('ron')
    expect(response.data.body).toEqual('Hello')
    expect(response.data.completed).toEqual(false)
  })

  it('should get product by id on GET /:id', async () => {
    const params = {
      author: 'ron', // todo
      body: 'Hello',
      completed: false,
    }
    let response = await axios.post('/products', params, { headers })
    expect(response.status).toEqual(201)

    const id = response.data._id
    response = await axios.get(`/products/${id}`, { headers })
    expect(response.status).toEqual(200)
    expect(response.data._id).toEqual(id)
    expect(response.data.author).toEqual('ron')
    expect(response.data.body).toEqual('Hello')
    expect(response.data.completed).toEqual(false)
  })

  it('should get product by keyword on GET /:id', async () => {
    const params = {
      author: 'ron', // todo
      body: 'Hello',
      completed: false,
    }
    let response = await axios.post('/products', params, { headers })
    expect(response.status).toEqual(201)

    response = await axios.get(`/products?q=Hel`, { headers })
    expect(response.data.data.length).toBeGreaterThanOrEqual(1)
    expect(response.status).toEqual(200)
    const product = response.data.data[0]
    expect(product.body).toEqual('Hello')
  })

  it('should update product by id on PUT /:id', async () => {
    const params = {
      author: 'ron', // todo
      body: 'Hello',
      completed: false,
    }
    let response = await axios.post('/products', params, { headers })
    expect(response.status).toEqual(201)

    const id = response.data._id
    response = await axios.put(
      `/products/${id}`,
      { body: 'Changed' },
      { headers }
    )
    expect(response.status).toEqual(200)
    expect(response.data._id).toEqual(id)
    expect(response.data.author).toEqual('ron')
    expect(response.data.body).toEqual('Changed')
    expect(response.data.completed).toEqual(false)
  })

  it('should delete product by id on DELETE /:id', async () => {
    const params = {
      author: 'ron', // todo
      body: 'Hello',
      completed: false,
    }
    let response = await axios.post('/products', params, { headers })
    expect(response.status).toEqual(201)

    const id = response.data._id
    response = await axios.delete(`/products/${id}`, { headers })
    expect(response.status).toEqual(204)
  })
})
