import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret'

export class AuthService {
  static verifyToken(token: string) {
      throw new Error('Method not implemented.')
  }
  private jwtSecret: string

  constructor(jwtSecret?: string) {
    this.jwtSecret = jwtSecret || JWT_SECRET
  }

  public async registerUser(username: string, password: string) {
    if (!username || !password) {
      throw new Error('Username and password are required')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log('Creating user with:', { username, hashedPassword })
    const user = await User.create({ username, password: hashedPassword })
    return user
  }

  public async authenticateUser(username: string, password: string) {
    const user = await User.findOne({ where: { username } })
    if (!user) throw new Error('User not found')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error('Invalid credentials')
    const token = jwt.sign({ id: user.id }, this.jwtSecret, { expiresIn: '1h' })
    return { user, token }
  }

  public verifyToken(token: string) {
    try {
      return jwt.verify(token, this.jwtSecret)
    } catch (error) {
      return null
    }
  }
}
