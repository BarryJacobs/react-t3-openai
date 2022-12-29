import type { Tool } from "interfaces"

export const example: Tool = {
  category: "Programming",
  title: "Explain code",
  description: "Interpret some code based on the language, code, and syntax provided",
  fields: [
    {
      type: "code",
      name: "code",
      label: "Code",
      placeholder: "Code...",
      hint: "Place some code above to understand how it works"
    }
  ],
  output: {
    title: "What does this code do?",
    description: "The following code does:"
  }
}
