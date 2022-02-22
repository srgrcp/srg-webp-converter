import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        {/* <meta httpEquiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' https:" /> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;600&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <body className='dark:bg-slate-800'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
