import mongoose from 'mongoose'
import { shoes } from './products'
import ProductModel, { Product } from '../src/product/model'

type Shoe = {
  title: string
  description: string
  image: string
  quantity: number
  price: number
}

export const createProduct = (product: Shoe) => {
  const item: Product = {
    ...product,
    images: [product.image],
    unitPrice: product.price,
    salePrice: product.price,
  }
  return item
}

export const seed = async () => {
  console.log('---Seeding----')
  try {
    await mongoose.connect('mongodb://root:example@127.0.0.1:27017')
    await ProductModel.deleteMany({}) // Clear existing products
    const products = shoes.map((shoe) => createProduct(shoe))
    await ProductModel.insertMany(products)
    console.log('--Seed Complete---')
    mongoose.connection.close()
  } catch (err) {
    mongoose.connection.close()
    throw err
  }
}
