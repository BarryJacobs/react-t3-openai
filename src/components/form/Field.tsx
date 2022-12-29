import { useState } from "react"
import type { FieldType } from "interfaces"
import { CodeEditor } from "components"
import { DebounceInput } from "react-debounce-input"

interface FieldProps {
  type: FieldType
  name: string
  label: string
  onChange: (...event: any[]) => void
  hint?: string
  value?: string
}

const renderLabel = (fieldName: string, labelText: string) => {
  return (
    <label htmlFor={fieldName} className="text-gray-600 font-medium text-md">
      {labelText}
    </label>
  )
}

export const Field = ({ type, name, label, hint, ...props }: FieldProps) => {
  const [language, setLanguage] = useState("")

  const renderField = () => {
    switch (type) {
      case "text":
        return (
          <>
            {renderLabel(name, label)}
            <input
              className="outline-none focus:outline-none text-md bg-white rounded-md px-3 py-2 w-full border focus:border-gray-400 border-gray-300 font-regular mt-1 transition-all"
              {...props}
            />
          </>
        )
      case "textarea":
        return (
          <>
            {renderLabel(name, label)}
            <textarea
              className="outline-none focus:outline-none text-md bg-white rounded-md px-3 py-2 w-full border focus:border-gray-400 border-gray-300 font-regular mt-1 transition-all"
              {...props}
            />
          </>
        )
      case "code":
        return (
          <>
            {renderLabel("language", "Language")}
            <DebounceInput
              debounceTimeout={500}
              value={language}
              onChange={event => setLanguage(event.target.value)}
              placeholder="e.g.: javascript"
              className="outline-none focus:outline-none text-md bg-white rounded-md px-3 py-2 w-full border focus:border-gray-400 border-gray-300 font-regular mt-1 transition-all"
            />
            <div className="text-gray-400 text-xs transition-all line mt-1 mb-4">
              Specify the language to enable markup highlighting
            </div>
            {renderLabel(name, label)}
            <div className="mt-1">
              <CodeEditor language={language.toLowerCase()} {...props} />
            </div>
          </>
        )
      default:
        null
    }
  }

  return (
    <div className="mt-4">
      {renderField()}
      {hint && (
        <div
          className={`text-gray-400 text-xs transition-all line mt-${
            type === "textarea" ? "0" : "1"
          }`}>
          {hint}
        </div>
      )}
    </div>
  )
}
