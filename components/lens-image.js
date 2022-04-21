import Image from 'next/image'

const ssimLevels = new Map()
ssimLevels.set(75, 'normal')
ssimLevels.set(100, 'ultra')

const lensLoader = ({ src, width, quality = 75 }) => {
  const ssimLevel = ssimLevels.get(quality)
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 3

  return `${process.env.LENS_BASEURL}/${src}?w=${width}&q=${ssimLevel}&d=${dpr}x`
}

const LensImage = props => <Image loader={lensLoader} {...props} />

export default LensImage
