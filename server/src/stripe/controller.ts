import stripe from 'stripe'
/*
1. secret key in .env
2. install stripe

https://blog.webdevsimplified.com/2021-07/stripe-checkout/
https://medium.com/@hikmatullahmcs/here-is-a-step-by-step-guide-on-how-to-integrate-stripe-with-a-node-js-77a25adf7064

1. client post /create-payment-intent
2. server post /payment-intent
3. client handles payment intent
4. client confirms payment
5. server handles webhook

*/

export const create = async (req, res) => {
  try {
    const { amount } = req.body
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    })
    res.status(200).json(paymentIntent)
  } catch (error: Error) {
    res.status(500).json({ error: error.message })
  }
}
