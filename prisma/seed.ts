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
            prompt: "",
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
