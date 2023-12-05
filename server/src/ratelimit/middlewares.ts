import setLimit from 'express-rate-limit'

const rateLimit = setLimit({
  windowMs: 60 * 1000,
  max: 50,
  message: 'You have exceeded your 50 requests per minute limit.',
  headers: true,
})

export { rateLimit }
