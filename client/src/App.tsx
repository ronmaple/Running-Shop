import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'

// TODO: make these imports consistent
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'

import { Home } from './pages/Home'
import { Products } from './pages/Products'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { About } from './pages/About'
import { ProductDetail } from './pages/ProductDetail'
import { AccountHome } from './pages/AccountHome'
import { ProtectedRoute } from './containers/ProtectedRoute'
import { Cart } from './pages/Cart'
import { Checkout } from './pages/Checkout'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { stripePublishableKey, stripeSecretKey } from './configs/env'
// TODO add theme
const defaultTheme = createTheme()

const stripePromise = loadStripe(stripePublishableKey)

function App() {
  const options = {
    // passing the client secret obtained from the server
    // clientSecret: '{{CLIENT_SECRET}}',
    // clientSecret: stripeSecretKey,
    clientSecret: '${id}_secret_${secret}',
  }
  return (
    <AuthProvider>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />

          <Route
            path="/order/checkout"
            element={
              // TODO: withStripe()
              <Elements stripe={stripePromise} options={options}>
                <Checkout />
              </Elements>
            }
          />

          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountHome />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App