import type { ReactNode } from "react"

interface GridProps {
  children: ReactNode
}

export const Grid = ({ children }: GridProps) => {
  return <div className="grid grid-cols-1 gap-8 mt-4 lg:grid-cols-2">{children}</div>
}
