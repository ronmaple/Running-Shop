export const apiURL = import.meta.env.VITE_API_KEY || 'http://localhost:3000'
export const stripePublishableKey =
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ''
export const stripeSecretKey = import.meta.env.VITE_STRIPE_SECRET_KEY || ''