import { useRouter } from "next/router"
import RouterLink from "./RoutesLink"

const Footer = () => {
    const router = useRouter()
    return (
        <div className="flex justify-center">
            {/* <RouterLink /> */}
            <a href="https://react-redux-neon.vercel.app/useReduxOfficial" rel="noopener" target="_blank" className="border p-2 rounded border-title hover:bg-title hover:text-black">回去學習~</a>

        </div>

    )
}

export default Footer