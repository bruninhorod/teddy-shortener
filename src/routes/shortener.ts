import { Router } from 'express'
import { shortenUrl, deleteShortenedUrl, listShortenedUrls, updateShortenedUrl} from '../controllers/shortener'
import { authenticate } from '../middleware/auth'
import { redirectUrl } from '../controllers/redirect-url'

const router = Router()

//Url Shortenet routes
router.post('/shorten', authenticate , shortenUrl)
router.get('/my-urls', authenticate, listShortenedUrls)
router.delete('/urls/:id', authenticate, deleteShortenedUrl)
router.put('/urls/:id', authenticate, updateShortenedUrl)

// Redirect Route
router.get('/:shortUrl', redirectUrl)

export default router