import Link from "next/link"
import { useRouter } from "next/router"

const RouterLink = () => {
    const router = useRouter()
    return (
        <>
            <Link href="/" className={router.pathname === "/" ? "active" : ""}>回到首頁</Link>
            <Link href="/Async" className={router.pathname === "/Async" ? "active" : ""}>前往範例一</Link>
            <Link href="/Async2" className={router.pathname === "/Async2" ? "active" : ""}>前往範例二</Link>
            <Link href="/Async3" className={router.pathname === "/Async3" ? "active" : ""}>前往範例三</Link>
        </>
    )
}

export default RouterLink