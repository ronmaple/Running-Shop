import mongoose, { Schema } from 'mongoose'

// Option 2 would be to keep a reference to the
// Product schema, but this way, we can keep a historical
// record of the product details incase the product
// detail changes -- ie these are the details when
// the product was purchased.
const orderItems = new Schema({
  id: String,
  title: String,
  description: String,
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  pricePerUnit: Number,
})

const orderSchema = new Schema(
  {
    id: String,
    items: [orderItems],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cartId: {
      type: Schema.Types.ObjectId,
      ref: 'Cart',
      required: true,
    },

    // TODO disambuigate tax
    tax: {
      type: Number,
    },
    totalPrice: Number,
    // Order status - ordered, delivered, picked up
  },
  {
    timestamps: true,
  }
)

const order = mongoose.model('order', orderSchema)

export default order
