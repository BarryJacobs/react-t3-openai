import type { Tool } from "interfaces"
import { Button, Field } from "components"
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline"
import { useForm, Controller } from "react-hook-form"
import { openai } from "utils/openai"

interface ToolFormProps {
  tool: Tool
}

export const ToolForm = ({ tool }: ToolFormProps) => {
  const { control, handleSubmit } = useForm()

  const onSubmit = async (data: unknown) => {
    const prompt = `# prompt: Interpret javascript code blocks and explain what they do in simple helpful terms
      # code:
      function bblSort(arr){
        for(var i = 0; i < arr.length; i++){
          for(var j = 0; j < ( arr.length - i -1 ); j++){
           if(arr[j] > arr[j+1]){
            var temp = arr[j]
            arr[j] = arr[j + 1]
            arr[j+1] = temp
          }
        }
      }
      console.log(arr);
      }
      # explanation of what the code does\n1.`

    console.log("Form data: ", data)
    try {
      const completion = await openai.createCompletion({
        model: "code-davinci-002",
        max_tokens: 300,
        temperature: 0.5,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        best_of: 1,
        stream: false,
        prompt: prompt,
        stop: ["# prompt", "# code", "# explanation", "<|endoftext|>"]
      })
      // console.log("completion: ", completion)
      if (completion.data && completion.data.choices && completion.data.choices[0]) {
        const data = completion.data.choices[0]
        let outputs: string[] = []

        if (completion.data.choices[0].text) {
          // Split break lines
          outputs = `1.${data.text}`.split("\n")

          // remove entries with spaces or empty
          outputs = outputs.filter(function (output) {
            return !(output === "" || output === " " || output === "\n")
          })

          if (outputs) {
            for (let i = 0; i < outputs.length; i++) {
              if (outputs[i]) {
                const test = outputs[i]
                if (test) {
                  outputs[i] = test.trim()
                }
              }
            }
          }

          // // remove numbers and spaces
          // if (outputs) {
          //   for (let i = 0; i < outputs.length; i++) {
          //     if (outputs[i]) {
          //       const test = outputs[i]
          //       if (test) {
          //         outputs[i] = test.substring(3)
          //         outputs[i] = test.replace(/^\s+|\s+$/g, "")
          //       }
          //     }
          //   }
          // }
          // // remove duplicates
          // outputs = outputs.filter((item, pos, self) => self.indexOf(item) === pos)
        }
        console.log("outputs: ", outputs)
      }
    } catch (error) {
      console.log("error", error)
    }
  }

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
