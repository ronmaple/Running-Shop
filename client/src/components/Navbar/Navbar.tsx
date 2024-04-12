import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import LoginIcon from '@mui/icons-material/Login'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useAuth } from '../../context/useAuth'

const pages = [
  {
    route: '/products',
    label: 'Products',
  },
  {
    route: '/about',
    label: 'About',
  },
]

// Unsure if this is how I want to do this
const settings = {
  authenticated: [
    { route: '/profile', label: 'Profile', logo: 'ProfileLogo' },
    { route: '/account', label: 'Account', logo: 'AccountLogo' },
    { route: '/dashboard', label: 'Dashboard', logo: 'DashboardLogo' },
    { route: '/logout', label: 'Logout', logo: 'LogoutLogo' },
  ],
  unauthenticated: [
    { route: '/login', label: 'Login', logo: 'LoginLogo' },
    { route: '/register', label: 'Register', logo: 'RegisterLogo' },
  ],
}

// TODO: separate into components
const NavigationBar = () => {
  const navigate = useNavigate()
  const { token } = useAuth()
  // TODO get user from context
  const user = null

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleClickCartMenu = (_event: React.MouseEvent<HTMLElement>) => {
    navigate('/cart')
  }

  return (
    <AppBar position="relative">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton onClick={() => navigate('/')}>
            <DirectionsRunIcon
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
            />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Running Shop
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.route} onClick={handleCloseNavMenu}>
                  <Link to={page.route}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Running Shop
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.route}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to={page.route}>{page.label}</Link>
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Tooltip title={user ? 'User Settings' : 'Register/Login'}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                {user ? (
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                ) : (
                  <LoginIcon />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title={'Cart'}>
              <IconButton onClick={handleClickCartMenu} sx={{ p: 1 }}>
                <ShoppingCartIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings[token ? 'authenticated' : 'unauthenticated'].map(
                (setting) => (
                  <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
                    <Link to={setting.route}>
                      <Typography textAlign="center">
                        {setting.label}
                      </Typography>
                    </Link>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavigationBar
