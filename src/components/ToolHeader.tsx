import type { Tool } from "interfaces"

interface ToolHeaderProps {
  tool: Tool
}

export const ToolHeader = ({ tool }: ToolHeaderProps) => {
  return (
    <div className="bg-white md:px-8 pt-4 shadow-lg mb-px border-b border-gray-300">
      <div className="container mx-auto px-4 md:px-28 mb-3">
        <div>
          <div className="text-sm font-medium text-gray-800 mb-1">{tool.category}</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-700 mb-1">{tool.title}</h2>
          <p className="text-sm text-gray-500 md:text-md lg:text-lg md:mt-2 lg:mx-0 ">
            {tool.description}
          </p>
        </div>
      </div>
    </div>
  )
}
