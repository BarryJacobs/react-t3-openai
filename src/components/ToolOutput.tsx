import type { Tool } from "types"
import { Loader } from "components"
import { Bars3BottomLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import Typist from "react-typist-component"

interface ToolOutputProps {
  loading: boolean
  tool: Tool
  outputs: string[] | undefined
}

export const ToolOutput = ({ loading, tool, outputs }: ToolOutputProps) => {
  if (!tool || !tool.output) return null
  return (
    <div className="relative mb-12">
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 shadow-lg transform md:skew-y-0 md:-rotate-3 md:rounded-3xl -mt-1 md:mt-0" />
      <div className="pb-4 align-bottom bg-white md:rounded-3xl text-left sm:align-middle transform transition shadow-md">
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
        {outputs && (
          <Typist typingDelay={20}>
            {outputs.map((output, index) => (
              <div key={index} className="divide-y-1 divide-dashed divide-gray-300">
                <div className="px-7 pb-3 flex items-start">
                  <div className="mr-4 flex-shrink-0 inline-flex items-center justify-center text-sm h-6 w-6 rounded-full bg-gray-200 text-gray-600">
                    <ChevronRightIcon className="h-4 w-4 text-gray-600" aria-hidden="true" />
                  </div>
                  <div>{output}</div>
                </div>
                {index < outputs.length - 1 && <hr className="mx-7 mb-3" />}
              </div>
            ))}
          </Typist>
        )}
      </div>
    </div>
  )
}
