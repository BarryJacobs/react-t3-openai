import type { ButtonHTMLAttributes } from "react"

export const Button = ({
  children,
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const buttonAttr = {
    ...props
  }
  if (disabled) {
    delete buttonAttr["onClick"]
  }

  return (
    <button
      className={
        disabled
          ? `select-none py-2 px-4 border-gray-300 bg-gray-300 hover:bg-gray-400 disabled hover:to-gray-700 text-white  rounded-md flex md:inline-flex font-medium text-lg cursor-pointer mt-4 md:mx-0 transition`
          : `select-none py-2 px-4 border-gray-400 bg-gray-500 hover:bg-gray-600 hover:via-blue-700 hover:to-gray-700 text-white  rounded-md flex md:inline-flex font-medium text-lg cursor-pointer mt-4 md:mx-0 transition`
      }
      {...buttonAttr}>
      {children}
    </button>
  )
}
