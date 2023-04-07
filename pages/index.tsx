import Head from "next/head";
import Layout from '../components/layout';
import Link from "next/link";
function HomePage() {
    return (
        <Layout>
            <Head>
                <title>新版Redux</title>
            </Head>

            <div className="flex flex-col items-center m-3">
                <h1 className="text-xl">透過一些範例來看看 非同步的情況</h1>
                <Link href="/Async" className="border border-title p-3 m-3">前往範例一</Link>
                <Link href="/Async2" className="border border-title p-3 m-3">前往範例二</Link>
            </div>

        </Layout>
    )
}

export default HomePage
