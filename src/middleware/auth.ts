import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'
import { AuthService } from '../services/auth'

const authService = new AuthService()

interface AuthRequest extends Request {
  user?: User
  userId?: number
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (req.path.includes('/shorten') && !token) {
    return next()
  }

  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    const decoded = authService.verifyToken(token)
    if (!decoded || typeof decoded === 'string') {
      return res.status(401).json({ error: 'Invalid token' })
    }

    const user = await User.findByPk(decoded.id)
    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    req.user = user
    req.userId = user.id
    next()
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' })
  }
}