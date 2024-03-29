import { Response, Request } from 'express'
import User from '../user/model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { jwtSecret, saltRounds } from './config'

// TODO: error types
// TODO: error codes

interface RequestHandler {
  (req: Request, res: Response): Promise<Response | any>
}

export const register: RequestHandler = async (req, res) => {
  const body = req.body
  try {
    const existingUser = await User.findOne({ email: body.email })
    if (existingUser) {
      throw new Error('email already taken')
    }
    // Not overdoing it here. Will need to add actual validation (ticket#74)
    if (body.password !== body.reenterPassword) {
      throw new Error('Signup Error')
    }

    const hashedPassword = await bcrypt.hash(body.password, saltRounds)
    const user = await User.create({
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      password: hashedPassword,
    })

    // TODO do not send user, just send a message. Frontend will re-direct to /login page instead
    res.status(200).send(user)
  } catch (err: any) {
    console.log(err)
    if (err.message === 'email already taken') {
      return res.status(409).send({ message: err.message })
    }
    if (err.message === 'Signup Error') {
      return res.status(422).send({ message: 'Signup Error' })
    }
    return res.send(500)
  }
}

export const login: RequestHandler = async (req, res) => {
  const body = req.body
  try {
    const existingUser = await User.findOne({ email: body.email })
    if (!existingUser) {
      throw new Error('Not Found')
    }

    const match = await bcrypt.compare(body.password, existingUser.password)
    if (!match) {
      throw new Error('Not Found')
    }

    const maxAge = 60 * 60 * 24 // 24hrs in seconds
    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
      jwtSecret,
      { expiresIn: maxAge }
    )
    // Decided to send the token instead of http-only -- for simplicity. Can revisit later
    // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    // res.status(200).send(existingUser)
    res.status(200).send({
      ...existingUser.toJSON(), // send just what is needed, later
      token,
    })
  } catch (err: any) {
    if (err.message === 'Not Found') {
      return res.status(404).send({ message: err.message })
    } else {
      return res.status(500).send({ message: 'Server Error' })
    }
  }
}

export const purge: RequestHandler = async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Not Allowed')
  }
  // I'm primarily using this route for tearing down tests...
  // reason why I'm doing this rather than in jest is to avoid too
  // many environment variables in the test suite for a demo app
  try {
    await User.deleteMany({})
    res.status(204).send()
  } catch (err: any) {}
}