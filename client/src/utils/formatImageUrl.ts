// this may be redundant when the images are actually uploaded to s3
// only useful for now

export const formatImageUrl = (filename: string) => {
  return `http://localhost:3000/static/${filename}`
}
