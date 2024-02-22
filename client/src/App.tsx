import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Routes, Route } from 'react-router-dom'

import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'

import { Home } from './pages/Home'
import { Products } from './pages/Products'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { About } from './pages/About'

// TODO add theme
const defaultTheme = createTheme()

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  )
}

export default App