import type { Tool } from "interfaces"
import { Button, Field } from "components"
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline"
import { useForm, Controller } from "react-hook-form"

interface ToolFormProps {
  tool: Tool
}

export const ToolForm = ({ tool }: ToolFormProps) => {
  const { control, handleSubmit } = useForm()

  const onSubmit = (data: unknown) => console.log("Form data: ", data)

  return (
    <div className="p-6 align-bottom bg-white md:rounded-md text-left overflow-hidden transform transition sm:align-middle shadow-md md:mb-8">
      <div className="mb-4 flex items-center">
        <div className="flex-shrink-0 inline-flex items-center justify-center md:h-12 md:w-12 h-6 w-6 rounded-full bg-green-300 sm:mx-0 sm:h-10 sm:w-10">
          <ChatBubbleLeftRightIcon
            className="h-3 w-3 md:h-6 md:w-6 text-green-700"
            aria-hidden="true"
          />
        </div>
        <div className="mt-0 ml-4 text-left">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Interpret code</h3>
          <p className="text-sm text-gray-500">Write details about your code below</p>
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
              render={({ field }) => (
                <Field {...toolField} value={field.value} onChange={field.onChange} />
              )}
            />
          )
        })}
        <Button type="submit">Perform request</Button>
      </form>
    </div>
  )
}