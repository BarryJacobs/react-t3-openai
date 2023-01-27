import { useMemo } from "react"
import { Button, Field } from "components"
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Tool } from "types"
import { z } from "zod"

interface ToolFormProps {
  tool: Tool
  completionInProgress: boolean
  onSubmit: (formData: Record<string, string>) => void
}

export const ToolForm = ({ tool, completionInProgress, onSubmit }: ToolFormProps) => {
  const schema = useMemo(() => {
    const schema: any = {}
    if (tool) {
      tool.fields.forEach(toolField => {
        let schemaField = z.string()
        toolField.validationRules.forEach(validationRule => {
          switch (validationRule.type) {
            case "required":
              schemaField = schemaField.min(1, {
                message: validationRule.message ?? `${toolField.label} is a required field`
              })
              break
            default:
          }
        })
        schema[toolField.name] = schemaField
      })
    }
    return z.object(schema)
  }, [tool])

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(schema)
  })

  if (!tool) return null
  return (
    <div className="transform overflow-hidden bg-white p-6 text-left align-bottom shadow-md transition sm:align-middle md:mb-8 md:rounded-md">
      <div className="mb-4 flex items-center">
        <div className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-300 sm:mx-0 sm:h-10 sm:w-10 md:h-12 md:w-12">
          <ChatBubbleLeftRightIcon
            className="h-3 w-3 text-green-700 md:h-6 md:w-6"
            aria-hidden="true"
          />
        </div>
        <div className="mt-0 ml-4 text-left">
          <h3 className="text-lg font-medium leading-6 text-gray-900">{tool.heading}</h3>
          <p className="text-sm text-gray-500">{tool.summary}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {tool.fields.map(toolField => {
          return (
            <Controller
              key={toolField.name}
              name={toolField.name}
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Field
                  type={toolField.type}
                  name={toolField.name}
                  label={toolField.label}
                  hint={toolField.hint}
                  placeholder={toolField.placeholder}
                  value={value as string}
                  error={error?.message}
                  onChange={onChange}
                />
              )}
            />
          )
        })}
        <Button disabled={completionInProgress} type="submit">
          Perform request
        </Button>
      </form>
    </div>
  )
}
