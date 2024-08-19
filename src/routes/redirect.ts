import { Router } from 'express'
import { redirectUrl } from '../controllers/redirect-url'

const router = Router()

// Redirect Route
router.get('/:shortUrl', redirectUrl)

export default router