import type { ReactNode } from "react"

interface ColumnProps {
  span: string
  className?: string
  children: ReactNode
}

export const Column = ({ span, className, children }: ColumnProps) => {
  return <div className={`col-span-${span} ${className}`}>{children}</div>
}
