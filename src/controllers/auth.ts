import { Request, Response } from 'express'
import { AuthService } from '../services/auth'


const authService = new AuthService()

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    const user = await authService.registerUser(username, password)
    res.status(201).json(user)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    const { user, token } = await authService.authenticateUser(username, password)
    res.json({ user, token })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}
