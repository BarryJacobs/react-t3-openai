import Link from "next/link"

interface ToolLinkProps {
  id: string
  group: string
  title: string
  description: string
}

export const ToolLink = ({ id, group, title, description }: ToolLinkProps) => {
  return (
    <Link href={`/tool/${id}`}>
      <div
        className={`bg-white flex-1 rounded-xl transition hover:shadow-md overflow-hidden md:max-w-1lg text-gray-500 cursor-pointer border border-gray-300 md:flex relative transform hover:scale-105  hover:text-black`}>
        <div className="p-4">
          <div className="uppercase tracking-wide text-sm text-green-500 font-semibold leading-none mb-2">
            {group}
          </div>
          <div className="block text-lg xl:text-xl 2xl:text-2xl font-medium text-black leading-none mb-1">
            {title}
          </div>
          <p className="mt-1 pr-1 text-sm ">{description} </p>
        </div>
      </div>
    </Link>
  )
}
