import { PaymentElement } from '@stripe/react-stripe-js'

const StripeCheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <button>Submit</button>
    </form>
  )
}

export default StripeCheckoutForm
