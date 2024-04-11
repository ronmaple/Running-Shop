import { Box } from '@mui/material'

type ImageProps = {
  src: string
  alt?: string
  sx?: object
  height?: string
  objectFit?: string
  backgroundSize?: string
  backgroundRepeat?: string
  maxWidth?: string | number
  maxHeight?: string | number
  // backgroundImage?: string
  [key: string]: any
}

const Image = (props: ImageProps) => {
  const { src, alt, ...sx } = props
  return (
    <Box
      component="img"
      src={props.src}
      alt={props.alt}
      sx={{
        ...sx,
      }}
    />
  )
}

Image.defaultProps = {
  objectFit: 'contain',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  maxWidth: '100%',
  maxHeight: '100%',
}

export { Image }
