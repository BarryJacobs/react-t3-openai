import type { ReactNode } from "react"
import Link from "next/link"

interface MenuItemProps {
  to: string
  children: ReactNode
}

export const MenuItem = ({ to, children }: MenuItemProps) => {
  return (
    <Link href={to}>
      <div className="bg-gray-100 hover:bg-gray-200 text-gray-800 transition text-lg flex py-2 px-4 lg:py-3 lg:px-6 cursor-pointer rounded-t-md font-medium items-center">
        {children}
      </div>
    </Link>
  )
}
