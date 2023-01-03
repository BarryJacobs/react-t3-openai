import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const run = async () => {
  const categoryData = [
    {
      name: "Programming",
      tools: {
        create: [
          {
            title: "Explain code",
            description: "Interpret some code based on the language, code, and syntax provided",
            fields: {
              create: [
                {
                  order: 1,
                  type: "code",
                  name: "code",
                  label: "Code",
                  placeholder: "Code...",
                  hint: "Place some code above to understand how it works"
                }
              ]
            },
            output: {
              create: {
                title: "What does this code do?",
                description: "The following code does:",
                usePrompt: true
              }
            },
            config: {
              create: {
                model: "code-davinci-002",
                prompt:
                  "# prompt: Explain what the following code does\n# code:\n${code}\n# explanation\n1.",
                resultPrefix: "1.",
                maxTokens: 300,
                temperature: 0.5,
                topP: 1,
                frequencyPenalty: 0.5,
                presencePenalty: 0,
                stopSequences: ["# prompt", "# author", "# end"]
              }
            }
          }
        ]
      }
    }
  ]

  const createCategories = categoryData.map(category =>
    prisma.category.create({
      data: category
    })
  )

  await prisma.$transaction(createCategories)
  await prisma.$disconnect()
}

run()
