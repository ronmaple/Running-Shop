import mongoose, { Schema } from 'mongoose'

const cartItem = new Schema({
  id: String,
  description: String,
  title: String,
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
  pricePerUnit: {
    type: Number,
    required: true,
  },
})

const cartSchema = new Schema(
  {
    id: String,
    items: [cartItem],
    // userId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },

    // TODO disambuigate tax
    totalPrice: Number,
  },
  {
    // todo: standardize time formats
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
      },
    },
  }
)

cartSchema.pre('save', function () {
  const cart = this
  let totalPrice = 0
  for (const item of cart.items) {
    totalPrice = item.pricePerUnit * item.quantity
  }
  cart.totalPrice = totalPrice
})

const cart = mongoose.model('cart', cartSchema)

export default cart
