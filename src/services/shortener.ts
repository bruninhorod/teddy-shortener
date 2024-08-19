import { ShortenedUrl } from "../models/shortened-url"


export class ShortenerService {
  public async shortenUrl(originalUrl: string, userId: number) {
    const shortUrl = this.generateShortUrl()
    await ShortenedUrl.create({ originalUrl, shortenedUrl: shortUrl, userId })
    return shortUrl
  }

  public async listUserUrls(userId: number) {
    return ShortenedUrl.findAll({ where: { userId, deletedAt: null } })
  }

  public async deleteUrl(userId: number, urlId: number) {
    console.log(urlId)
    const url = await ShortenedUrl.findOne({ where: { id: urlId, userId } })
    if (!url) throw new Error('URL not found')
    await url.destroy()
  }

  public async updateUrl(userId: number, urlId: number, newUrl: string) {
    const url = await ShortenedUrl.findOne({ where: { id: urlId, userId } })
    if (!url) throw new Error('URL not found')
    url.originalUrl = newUrl
    await url.save()
  }

  public async getOriginalUrl(shortenedUrl: string): Promise<string | null> {
    const shortened = await ShortenedUrl.findOne({ where: { shortenedUrl } })
    if (shortened) {
      return shortened.originalUrl
    }
    return null
  }

  private generateShortUrl() {
    return Math.random().toString(36).substring(2, 8)
  }
}
