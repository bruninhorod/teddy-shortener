import { Request, Response } from 'express'
import { ShortenerService } from '../services/shortener'

const shortenerService = new ShortenerService()

export const redirectUrl = async (req: Request, res: Response) => {
  const { shortId } = req.params

  try {
    const originalUrl = await shortenerService.getOriginalUrl(shortId)

    if (!originalUrl) {
      return res.status(404).send('URL not found')
    }

    res.redirect(originalUrl)
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
}
