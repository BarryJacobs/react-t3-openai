import type { ReactNode } from "react"

interface ContainerProps {
  className?: string
  children: ReactNode
}

export const Container = ({ className, children }: ContainerProps) => {
  return (
    <div
      className={`container mx-auto overflow-hidden ${className || "md:px-28 md:py-8 lg:py-12 "}`}>
      {children}
    </div>
  )
}
