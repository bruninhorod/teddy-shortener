import { Request, Response } from 'express'
import { ShortenedUrl } from '../models/shortened-url'

export const redirectUrl = async (req: Request, res: Response) => {
  try {
    const { shortUrl } = req.params
    const urlRecord = await ShortenedUrl.findOne({ where: { shortenedUrl: shortUrl } })

    if (!urlRecord) {
      return res.status(404).json({ error: 'URL not found' })
    }

    urlRecord.clickCount += 1
    await urlRecord.save()

    res.redirect(urlRecord.originalUrl)
  } catch (error: any) {
    res.status(500).json({ error: 'Server error' })
  }
}