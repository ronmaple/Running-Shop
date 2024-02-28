import Button from '@mui/material/Button'

import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useNavigate } from 'react-router-dom'
import background1 from '../../assets/background_1.webp'

// const SLOGAN = 'Stride Further with Endurify'
const tagline = 'Stride Farther'
const heroText = `
            Elevate your performance and style with our curated selection,
            designed for runners who demand the best. Experience unparalleled
            comfort and innovation with every step.
`

const Home = () => {
  const navigate = useNavigate()

  const handleBrowseButton: React.MouseEventHandler<HTMLButtonElement> = (
    _event
  ) => {
    navigate('/products')
  }

  return (
    <main>
      <Box
        sx={{
          backgroundImage: `url(${background1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
          height: '100vh',
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            p: 3,
          }}
        >
          <Typography
            component="h2"
            variant="h4"
            align="center"
            sx={{
              color: 'white',
              backgroundColor: '#333333',
              padding: '0.2em 0.5em',
              borderRadius: '4px',
              opacity: '0.95',
            }}
            gutterBottom
          >
            {tagline}
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              color: 'white',
              backgroundColor: '#333333',
              padding: '0.2em 1em',
              borderRadius: '4px',
              opacity: '0.95',
            }}
            paragraph
          >
            {heroText}
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button
              onClick={handleBrowseButton}
              sx={{
                textTransform: 'none',
                borderRadius: '0',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              }}
              variant="contained"
            >
              Browse Our Selections
            </Button>
          </Stack>
        </Container>
      </Box>
    </main>
  )
}

export { Home }
