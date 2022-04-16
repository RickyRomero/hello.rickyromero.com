import Image from 'next/image'

const ssimLevels = new Map()
ssimLevels.set(50, 'potato')
ssimLevels.set(75, 'basic')
ssimLevels.set(100, 'ui')

const lensLoader = ({ src, width, quality = 75 }) => {
  const ssimLevel = ssimLevels.get(quality)
  return `${process.env.LENS_BASEURL}/${src}?w=${width}&q=${ssimLevel}`
}

const LensImage = props => <Image loader={lensLoader} {...props} />

export default LensImage
