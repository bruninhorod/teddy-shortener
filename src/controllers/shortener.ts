import { Request, Response } from 'express'
import dotenv from 'dotenv'
import { ShortenerService } from '../services/shortener'
import { User } from '../models/user'

const shortenerService = new ShortenerService()
dotenv.config()

interface AuthRequest extends Request {
  user?: User
}

export const shortenerController = (req: AuthRequest, res: Response) => {
  if (req.user) {
    console.log(req.user)
    res.json({ user: req.user })
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }
}

export const shortenUrl = async (req: AuthRequest, res: Response) => {
  try {
    const { originalUrl } = req.body
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    if (!originalUrl) {
      return res.status(400).json({ error: 'Original URL is required' })
    }

    const shortenedUrl = await shortenerService.shortenUrl(originalUrl, req.user.id)
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
    res.json({ shortenedUrl: `${baseUrl}/${shortenedUrl}` })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const listShortenedUrls = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const urls = await shortenerService.listUserUrls(req.user.id)
    res.json(urls)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const deleteShortenedUrl = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const { id } = req.params
    await shortenerService.deleteUrl( req.user.id, parseInt(id))
    res.status(204).send()
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const updateShortenedUrl = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const { id } = req.params
    const { newUrl } = req.body
    if (!newUrl) {
      return res.status(400).json({ error: 'New URL is required' })
    }

    const updatedUrl = await shortenerService.updateUrl(req.user.id, parseInt(id), newUrl )
    res.json({ updatedUrl })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}
