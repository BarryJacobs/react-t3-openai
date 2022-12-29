import { Loader } from "components"
import type { Tool } from "interfaces"
import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid"

interface ToolOutputProps {
  loading: boolean
  tool: Tool
}

export const ToolOutput = ({ loading, tool }: ToolOutputProps) => {
  return (
    <div className="relative mb-12">
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 shadow-lg transform md:skew-y-0 md:-rotate-3 md:rounded-3xl -mt-1 md:mt-0" />
      <div className="align-bottom bg-white md:rounded-3xl text-left sm:align-middle transform transition shadow-md">
        <div className="px-6 py-6">
          <div className="sm:flex sm:items-start">
            {loading ? (
              <Loader active={loading} />
            ) : (
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-300 sm:mx-0 sm:h-10 sm:w-10 bg-gradient-to-r from-green-400 to-blue-500">
                <Bars3BottomLeftIcon className="w-6 text-white" aria-hidden="true" />
              </div>
            )}
            <div className="text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{tool.output.title}</h3>
              <p className="text-sm text-gray-500">{tool.output.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
