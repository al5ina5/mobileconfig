import Link from 'next/link'

export default function Custom404() {
    return <>
        <section>
            <h1>404</h1>
            <h2>Err... that page was not found.</h2>
            <p>You should probably <Link href="/">go home</Link>.</p>
        </section>

        <section>
            <img src="https://media.giphy.com/media/3o7bu5AoSsr2bfe4fK/giphy.gif" alt="" />
        </section>
    </>
}