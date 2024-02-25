import mongoose, { Schema } from 'mongoose'

export enum Roles {
  Admin = 'Admin',
  Basic = 'Basic',
}

export type User = {
  id: string
  _id: string
  email: string
  firstName: string
  lastName: string
  password: string
  role: Roles
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    firstName: {
      type: String,
      unique: false,
      required: true,
    },
    lastName: {
      type: String,
      unique: false,
      required: true,
    },
    password: {
      type: String,
      minlength: 12,
      required: true,
    },
    role: {
      type: String,
      default: Roles.Basic,
      enum: Roles,
      required: true,
    },
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

const user = mongoose.model('user', userSchema)

export default user