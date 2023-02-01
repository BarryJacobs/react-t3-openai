import { CodeEditor } from "components"
import TextareaAutosize from "react-textarea-autosize"

interface FieldProps {
  type: string
  name: string
  label: string
  onChange: (...event: any[]) => void
  hint: string
  placeholder: string
  error?: string
  value?: string
}

const renderLabel = (fieldName: string, labelText: string) => {
  return (
    <label htmlFor={fieldName} className="text-md font-medium text-gray-600">
      {labelText}
    </label>
  )
}

export const Field = ({ type, name, label, hint, error, ...props }: FieldProps) => {
  const renderField = (borderColor: string) => {
    switch (type) {
      case "text":
        return (
          <>
            {renderLabel(name, label)}
            <input
              className={`text-md font-regular mt-1 w-full rounded-md border-2 border-${borderColor}-300 bg-white px-3 py-2 outline-none transition-all focus:border-${borderColor}-400 focus:outline-none`}
              {...props}
            />
          </>
        )
      case "textarea":
        return (
          <>
            {renderLabel(name, label)}
            <TextareaAutosize
              className={`text-md w-full rounded-md border-2 bg-white px-3 py-2 outline-none focus:outline-none focus:border-${borderColor}-400 border-${borderColor}-300 font-regular mt-1 transition-all`}
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

  const borderColor = error ? "red" : "gray"
  return (
    <div className="mt-4">
      {renderField(borderColor)}
      {error ? (
        <div className={`text-xs text-red-600 mt-${type === "textarea" ? "0" : "1"}`}>{error}</div>
      ) : (
        hint && (
          <div className={`text-xs text-gray-400 mt-${type === "textarea" ? "0" : "1"}`}>
            {hint}
          </div>
        )
      )}
    </div>
  )
}
