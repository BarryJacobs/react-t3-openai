import type { ButtonHTMLAttributes, MouseEvent } from "react"

export const Button = ({
  children,
  disabled,
  onClick,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const buttonAttr = {
    ...props
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      event.preventDefault()
    } else {
      if (onClick) onClick(event)
    }
  }

  return (
    <button
      className={
        disabled
          ? `select-none py-2 px-4 border-gray-300 bg-gray-300 disabled text-white rounded-md flex md:inline-flex font-medium text-lg cursor-pointer mt-4 md:mx-0 transition`
          : `select-none py-2 px-4 border-gray-400 bg-gray-500 hover:bg-gray-600 hover:via-blue-700 hover:to-gray-700 text-white  rounded-md flex md:inline-flex font-medium text-lg cursor-pointer mt-4 md:mx-0 transition`
      }
      {...buttonAttr}
      onClick={handleClick}>
      {children}
    </button>
  )
}
