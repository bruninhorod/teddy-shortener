import { ShortenedUrl } from '../models/shortened-url'

export class ShortenedUrlRepository {
  public async createUrl(originalUrl: string, userId?: number): Promise<ShortenedUrl> {
    try {
      const shortenedUrl = await ShortenedUrl.create({
        originalUrl,
        userId,
        shortCode: this.generateShortCode()
      })
      return shortenedUrl
    } catch (error: any) {
      throw new Error(`Error creating URL: ${error.message}`)
    }
  }

  public async findUrlByShortCode(shortCode: string): Promise<ShortenedUrl | null> {
    try {
      const url = await ShortenedUrl.findOne({ where: { shortCode } })
      return url
    } catch (error: any) {
      throw new Error(`Error finding URL: ${error.message}`)
    }
  }

  async getOriginalUrl(shortenedUrl: string): Promise<ShortenedUrl | null> {
    return await ShortenedUrl.findOne({ where: { shortenedUrl } })
  }

  public async listUrls(userId: number): Promise<ShortenedUrl[]> {
    try {
      const urls = await ShortenedUrl.findAll({ where: { userId, deletedAt: null } })
      return urls
    } catch (error: any) {
      throw new Error(`Error listing URLs: ${error.message}`)
    }
  }

  public async updateUrl(id: number, newUrl: string, userId: number): Promise<ShortenedUrl | null> {
    try {
      const url = await ShortenedUrl.findOne({ where: { id, userId, deletedAt: null } })
      if (!url) throw new Error('URL not found')
      url.originalUrl = newUrl
      await url.save()
      return url
    } catch (error: any) {
      throw new Error(`Error updating URL: ${error.message}`)
    }
  }

  public async deleteUrl(id: number, userId: number): Promise<void> {
    try {
      const url = await ShortenedUrl.findOne({ where: { id, userId, deletedAt: null } })
      if (!url) throw new Error('URL not found')
      url.deletedAt = new Date()
      await url.save()
    } catch (error: any) {
      throw new Error(`Error deleting URL: ${error.message}`)
    }
  }

  private generateShortCode(): string {
    return Math.random().toString(36).substr(2, 6).toUpperCase()
  }
}
