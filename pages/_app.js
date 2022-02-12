import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <style>@import url(&apos;https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Nunito:wght@400;600;700&display=swap&apos;);</style>
      </Head>
      
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
