import type { Tool } from "types"
import { Menu } from "components"

interface ToolHeaderProps {
  tool: Tool
}

export const ToolHeader = ({ tool }: ToolHeaderProps) => {
  if (!tool) return null
  return (
    <>
      <div className="bg-white pl-4 pb-1">
        <div className="container mx-auto px-4 md:px-28 py-5 flex items-center flex-1">
          <div>
            <div className="text-sm font-medium text-gray-800 mb-1">{tool.category.name}</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-700 mb-1">{tool.title}</h2>
            <p className="text-sm text-gray-500 md:text-md lg:text-lg md:mt-2 lg:mx-0 ">
              {tool.description}
            </p>
          </div>
        </div>
      </div>
      <Menu displaySearch={false} />
    </>
  )
}
