import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface Payload {
  _id: string;
  iat: number;
}

export class Middleware {
  verifyToken(req: Request, res: Response, next: NextFunction): void {
    try {
      const token =  req.headers.authorization ?? ''
      if (!token) res.status(401).send({ message: 'No token was provided' })
      const parts = token.split(' ')
      if (parts.length < 2) res.status(401).send({ message: 'Token error' })
      const [scheme, credentials] = parts
      if (!/^Bearer$/i.test(scheme)) res.status(401).send({ message: 'Badly formatted token' })
      const payload = jwt.verify(credentials, process.env.JWT_SECRET ?? 'secret') as Payload
      req.userId = payload._id
      next()
    } catch(err) {
      res.status(400).send({ message: 'Invalid token' })
    }
  }
}
