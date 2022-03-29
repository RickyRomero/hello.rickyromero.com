const Player = ({ uses }) => {
  const variants = [
    // I would add AV1 here, but it's really CPU heavy still...
    { suffix: 'hvc', codec: 'hvc1.1.6.H153.B0' }, // HVEC/H.265
    { suffix: 'vp9', codec: 'vp09.00.51.08.01.01.01.01.00' }, // VP9
    { suffix: 'avch', codec: 'avc1.640033' }, // AVC/H.264 high profile
    { suffix: 'avcm', codec: 'avc1.4d401f' } // AVC/H.264 main profile
  ]

  const sources = variants.map(({ suffix, codec }) => {
    const file = `${uses}-${suffix}.mp4`
    return (
      <source
        key={file}
        src={`/videos/${file}`}
        type={`video/mp4; codecs=${codec}`}
      />
    )
  })

  return (
    <video autoPlay playsInline muted loop>
      {sources}
    </video>
  )
}

export default Player