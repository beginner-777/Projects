import Link from 'next/link'
export default function NotFound() { return <section className="not-found shell"><span>404</span><h1>This room is still empty.</h1><p>The page you are looking for does not exist.</p><Link className="button button-ink" href="/">Return home</Link></section> }
