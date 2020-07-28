import Head from 'next/head'

import '../global.scss'

export default function App({ Component, pageProps }) {
    return <>
        <Head>
            <link rel="stylesheet" href="https://unpkg.com/anticss" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" />
        </Head>
        <Component {...pageProps} />
    </>
}