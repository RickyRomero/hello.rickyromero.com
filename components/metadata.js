import Head from 'next/head'
import { useRouter } from 'next/router'

const Metadata = ({ title, description, preview, type = 'article', children }) => {
  const router = useRouter()
  if (title.length > 40) { throw new Error(`Title too long: ${title}`) }
  if (description.length > 160) { throw new Error(`Description too long: ${description}`) }

  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:title" content={title} />
      <meta property="og:title" content={title} />

      <meta name="description" content={description} />
      <meta name="twitter:description" content={description} />
      <meta property="og:description" content={description} />

      <meta property="twitter:domain" content={process.env.HOST} />
      <meta property="twitter:url" content={`${process.env.BASEURL}${router.asPath}`} />
      <meta property="og:url" content={`${process.env.BASEURL}${router.asPath}`} />

      <meta name="twitter:image" content={preview} />
      <meta property="og:image" content={preview} />
      <meta property="og:image:width" content="2400" />
      <meta property="og:image:height" content="1260" />

      <meta name="author" content="Ricky Romero" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@RickyRomero" />
      <meta name="twitter:creator" content="@RickyRomero" />
      <meta property="og:type" content={type} />

      <link rel="mask-icon" href={`${process.env.LENS_BASEURL}/shared/apple-pinned-tab-16x16.svg`} color="#5600cc" />
      <link rel="icon" type="image/png" href={`${process.env.LENS_BASEURL}/shared/favicon-194x194.png`} sizes="194x194" />
      <link rel="icon" type="image/png" href={`${process.env.LENS_BASEURL}/shared/favicon-96x96.png`} sizes="96x96" />
      <link rel="icon" type="image/png" href={`${process.env.LENS_BASEURL}/shared/favicon-16x16.png`} sizes="16x16" />
      <link rel="icon" type="image/png" href={`${process.env.LENS_BASEURL}/shared/favicon-32x32.png`} sizes="32x32" />
    </Head>
  )
}

export default Metadata
