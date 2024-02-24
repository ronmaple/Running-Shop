import { Box } from '@mui/material'

type ImageProps = {
  src: string
  alt?: string
  sx?: object
}

const Image = ({ src, alt, sx }: ImageProps) => {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        ...sx,
      }}
    />
  )
}

export { Image }
