import Image from 'next/image'
import Link from 'next/link'

const ssimLevels = new Map()
ssimLevels.set(75, 'normal')
ssimLevels.set(100, 'ultra')

const lensLoader = ({ src, width, quality = 75 }) => {
  const ssimLevel = ssimLevels.get(quality)
  const dpr = Math.min(3, Math.max(1, (
    typeof window !== 'undefined'
      ? Math.ceil(window.devicePixelRatio)
      : 3
  )))

  return `${process.env.LENS_BASEURL}/${src}?w=${width}&q=${ssimLevel}&d=${dpr}x`
}

const LensImage = ({ linkToImage = false, ...props }) => {
  if (linkToImage) {
    const { src } = props
    const href = lensLoader({ src, width: 2560 })
    return (
      <Link href={href}>
        <Image loader={lensLoader} {...props} />
      </Link>
    )
  } else {
    return <Image loader={lensLoader} {...props} />
  }
}

export default LensImage
