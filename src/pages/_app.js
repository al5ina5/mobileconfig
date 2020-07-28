import Head from 'next/head'

import '../global.scss'

export default function App({ Component, pageProps }) {
    return <>
        <Head>
            <link rel="stylesheet" href="https://unpkg.com/anticss" />
        </Head>
        <Component {...pageProps} />
    </>
}