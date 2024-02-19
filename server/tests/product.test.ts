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
    expect(response.status).toEqual(201)
    expect(response.data.title).toEqual(product.title)
    expect(response.data.description).toEqual(product.description)
    expect(response.data.unitPrice).toEqual(product.unitPrice)
    expect(response.data.salePrice).toEqual(product.salePrice)
    expect(response.data.inventory).toEqual(product.inventory)
    expect(response.data.images).toEqual(product.images)
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

    const id = response.data._id
    response = await axios.get(`/products/${id}`, { headers })
    expect(response.status).toEqual(200)
    expect(response.data._id).toEqual(id)
    expect(response.data.title).toEqual(product.title)
    expect(response.data.description).toEqual(product.description)
    expect(response.data.unitPrice).toEqual(product.unitPrice)
    expect(response.data.salePrice).toEqual(product.salePrice)
    expect(response.data.inventory).toEqual(product.inventory)
    expect(response.data.images).toEqual(product.images)
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

    const id = response.data._id
    const updatedProduct = {
      title: 'Updated Product',
      description: 'This is an updated test product',
      unitPrice: 110,
      salePrice: 95,
      inventory: 15,
      images: ['http://example.com/updated_image.jpg'],
    }
    response = await axios.put(`/products/${id}`, updatedProduct, { headers })
    expect(response.status).toEqual(200)
    expect(response.data._id).toEqual(id)
    expect(response.data.title).toEqual(updatedProduct.title)
    expect(response.data.description).toEqual(updatedProduct.description)
    expect(response.data.unitPrice).toEqual(updatedProduct.unitPrice)
    expect(response.data.salePrice).toEqual(updatedProduct.salePrice)
    expect(response.data.inventory).toEqual(updatedProduct.inventory)
    expect(response.data.images).toEqual(updatedProduct.images)
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

    const id = response.data._id
    response = await axios.delete(`/products/${id}`, { headers })
    expect(response.status).toEqual(204)
  })
})
