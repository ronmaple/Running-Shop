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

  it('should create a product on POST /products', async () => {
    const product = {
      title: 'Test Product',
      description: 'This is a test product',
      unitPrice: 100,
      salePrice: 90,
      inventory: 10,
      images: ['http://example.com/image.jpg'],
    }
    const response = await axios.post('/products', product, { headers })
    const { data } = response
    expect(response.status).toEqual(201)
    expect(data.title).toEqual(product.title)
    expect(data.description).toEqual(product.description)
    expect(data.unitPrice).toEqual(product.unitPrice)
    expect(data.salePrice).toEqual(product.salePrice)
    expect(data.inventory).toEqual(product.inventory)
    expect(data.images).toEqual(product.images)
    expect(data.id).not.toBeNull()
    expect(data._id).toBeUndefined()
  })

  it('should get a product by id on GET /products/:id', async () => {
    const product = {
      title: 'Test Product',
      description: 'This is a test product',
      unitPrice: 100,
      salePrice: 90,
      inventory: 10,
      images: ['http://example.com/image.jpg'],
    }
    let response = await axios.post('/products', product, { headers })
    expect(response.status).toEqual(201)

    response = await axios.get(`/products/${response.data.id}`, { headers })
    const { data } = response
    expect(response.status).toEqual(200)
    expect(data.id).toEqual(data.id)
    expect(data._id).toBeUndefined()
    expect(data.title).toEqual(product.title)
    expect(data.description).toEqual(product.description)
    expect(data.unitPrice).toEqual(product.unitPrice)
    expect(data.salePrice).toEqual(product.salePrice)
    expect(data.inventory).toEqual(product.inventory)
    expect(data.images).toEqual(product.images)
  })

  it('should update a product by id on PUT /products/:id', async () => {
    const product = {
      title: 'Test Product',
      description: 'This is a test product',
      unitPrice: 100,
      salePrice: 90,
      inventory: 10,
      images: ['http://example.com/image.jpg'],
    }
    let response = await axios.post('/products', product, { headers })
    expect(response.status).toEqual(201)

    const id = response.data.id
    const updatedProduct = {
      title: 'Updated Product',
      description: 'This is an updated test product',
      unitPrice: 110,
      salePrice: 95,
      inventory: 15,
      images: ['http://example.com/updated_image.jpg'],
    }
    response = await axios.put(`/products/${id}`, updatedProduct, { headers })
    const { data } = response
    expect(response.status).toEqual(200)
    expect(data.id).toEqual(id)
    expect(data._id).toBeUndefined()
    expect(data.title).toEqual(updatedProduct.title)
    expect(data.description).toEqual(updatedProduct.description)
    expect(data.unitPrice).toEqual(updatedProduct.unitPrice)
    expect(data.salePrice).toEqual(updatedProduct.salePrice)
    expect(data.inventory).toEqual(updatedProduct.inventory)
    expect(data.images).toEqual(updatedProduct.images)
  })

  it('should delete a product by id on DELETE /products/:id', async () => {
    const product = {
      title: 'Test Product',
      description: 'This is a test product',
      unitPrice: 100,
      salePrice: 90,
      inventory: 10,
      images: ['http://example.com/image.jpg'],
    }
    let response = await axios.post('/products', product, { headers })
    expect(response.status).toEqual(201)

    const id = response.data.id
    response = await axios.delete(`/products/${id}`, { headers })
    expect(response.status).toEqual(204)
  })
})
