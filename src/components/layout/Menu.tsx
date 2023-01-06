import { useState } from "react"
import { MenuItem } from "components"
import { Cog8ToothIcon } from "@heroicons/react/24/outline"
import { DebounceInput } from "react-debounce-input"

interface MenuProps {
  displaySearch: boolean
  onSearchUpdate?: (value: string) => void
}

export const Menu = ({ displaySearch, onSearchUpdate }: MenuProps) => {
  const [search, setSearch] = useState("")

  const onSearchChangeHandler = (value: string) => {
    setSearch(value)
    if (onSearchUpdate) {
      onSearchUpdate(value)
    }
  }

  return (
    <div className="border-b border-gray-300 bg-white shadow-sm ">
      <div className="container flex mx-auto px-3 md:px-20 select-none">
        <MenuItem to="/">
          <Cog8ToothIcon className="w-7 h-7 mr-2 transition" />
          <div>Tools</div>
        </MenuItem>
        {displaySearch && (
          <div className="relative text-gray-400 focus-within:text-green-500 flex flex-1 ">
            <label
              htmlFor="q"
              className="absolute inset-y-0 left-0 top-0 bottom-0 hidden md:flex items-center lg:pl-2 ">
              <div className="p-2 focus:outline-none focus:shadow-outline ">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 transition">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </label>
            <DebounceInput
              type="search"
              id="search"
              name="search"
              className="py-1 pl-4 md:pl-14 text-xl focus:outline-none focus:bg-white focus:text-gray-900 transition flex flex-1 w-full"
              placeholder="Search..."
              autoComplete="off"
              value={search}
              onChange={e => onSearchChangeHandler(e.target.value)}
              debounceTimeout={300}
            />
          </div>
        )}
      </div>
    </div>
  )
}
