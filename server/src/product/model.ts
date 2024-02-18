import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
  author: String, // TODO: Link to an ID of a user
  // accessControl: {} // TODO: add access control
  body: String,
  date: {
    type: Date,
    default: Date.now,
  },
  completed: {
    type: Boolean,
    default: false,
  },
})

const product = mongoose.model('product', productSchema)

export default product
