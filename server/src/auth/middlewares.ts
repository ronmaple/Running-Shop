import jwt from 'jsonwebtoken'
import { jwtSecret } from './config'
import { Roles } from '../user/model'
import { Request, Response, NextFunction } from 'express'

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.jwt
    if (!token) {
      throw new Error('Unauthorized')
    }
    jwt.verify(token, jwtSecret, (err: any, payload: any) => {
      if (err || !Object.keys(Roles).includes(payload.role)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }
      next()
    })
  } catch (error) {
    // TODO: general error handler
    return res.status(401).send({ message: 'Unauthorized' })
  }
}
