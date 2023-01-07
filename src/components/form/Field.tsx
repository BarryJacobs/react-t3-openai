import { CodeEditor } from "components"
import TextareaAutosize from "react-textarea-autosize"

interface FieldProps {
  type: string
  name: string
  label: string
  onChange: (...event: any[]) => void
  hint: string
  placeholder: string
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
            <TextareaAutosize
              className="outline-none focus:outline-none text-md bg-white rounded-md px-3 py-2 w-full border focus:border-gray-400 border-gray-300 font-regular mt-1 transition-all"
              {...props}
            />
          </>
        )
      case "code":
        return (
          <>
            {renderLabel(name, label)}
            <div className="mt-1 w-full">
              <CodeEditor {...props} />
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
