import { Container, Logo } from "components"
import { CircleStackIcon } from "@heroicons/react/24/outline"

export const Header = () => {
  return (
    <div className="bg-white">
      <Container className="px-4 py-4 md:px-28 flex items-center flex-1">
        <div className="mr-4">
          <Logo />
        </div>
        <div>
          <div className="text-4xl relative font-medium text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-600 inline-block">
            OpenAI<span className="font-normal "> Playground</span>
          </div>
          <div className="hidden md:block text-xl text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-500">
            Create and use OpenAI Prompts and Outputs
          </div>
          <div className="flex">
            <div className="items-center flex bg-gray-100 text-gray-500 text-sm rounded-md px-3 py-1 font-medium my-2 mr-2">
              <CircleStackIcon className="w-4 h-4 mr-2" />
              9999&nbsp;
              <span className="hidden lg:block">credits remain</span>
            </div>
          </div>
        </div>
      </Container>
      <div className="border-b border-gray-300 bg-white shadow-sm">
        <div className="container flex mx-auto px-4 md:px-28 select-none"></div>
      </div>
    </div>
  )
}
