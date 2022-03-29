import Head from 'next/head'

const Metadata = ({ children }) => {
  return (
    <Head>
      <title>Ricky Romero: Design + Code</title>
      <meta name="description" content="My name's Ricky. I design and code. Let's build something incredible." />
      <link rel="mask-icon" href="/apple-pinned-tab-16x16.svg" color="#5600cc" />
      <link rel="icon" type="image/png" href="/favicon-194x194.png" sizes="194x194" />
      <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
      <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
      {children}
    </Head>
  )
}

export default Metadata
