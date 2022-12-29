import { useEffect } from "react"
import { type AppType } from "next/app"
import { trpc } from "utils/trpc"

import "styles/globals.css"

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    document.body.className = "antialiased font-sans bg-gradient-to-r from-gray-100 to-gray-200"
  }, [])

  return <Component {...pageProps} />
}

export default trpc.withTRPC(MyApp)
