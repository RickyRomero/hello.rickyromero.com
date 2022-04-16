import cl from 'utils/classlist'

import styles from './player.module.css'

const Player = ({ className, uses, width, height }) => {
  const variants = [
    // I would add AV1 here, but it's really CPU heavy still...
    { suffix: 'hvc', codec: 'hvc1.1.6.H153.B0' }, // HVEC/H.265
    { suffix: 'vp9', codec: 'vp09.00.51.08.01.01.01.01.00' }, // VP9
    { suffix: 'avch', codec: 'avc1.640033' }, // AVC/H.264 high profile
    { suffix: 'avcm', codec: 'avc1.4d401f' } // AVC/H.264 main profile
  ]

  const serverPath = uses.match(/^.+\//)
  const filename = uses.match(/[^/]+$/)
  const sources = variants.map(({ suffix, codec }) => {
    const file = `${filename}-${suffix}.mp4`
    const fullPath = `${serverPath}${file}`
    const url = `${process.env.LENS_BASEURL}/${fullPath}`
    return (
      <source
        key={url}
        src={url}
        type={`video/mp4; codecs=${codec}`}
      />
    )
  })

  return (
    <video
      className={cl(styles.player, className)}
      width={width}
      height={height}
      style={{ aspectRatio: `${width} / ${height}` }}
      autoPlay playsInline muted loop
    >
      {sources}
    </video>
  )
}

export default Player
