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
            heading: "Interpret code",
            summary: "Write details about your code below",
            fields: {
              create: [
                {
                  order: 1,
                  type: "code",
                  name: "code",
                  label: "Code",
                  hint: "Place some code above to understand how it works",
                  placeholder: ""
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
                resultPrefix: "1. ",
                maxTokens: 500,
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
    },
    {
      name: "Content",
      tools: {
        create: [
          {
            title: "Summarise points",
            description: "Analyze your text or documents and convey the important concepts",
            heading: "Text content",
            summary: "A sentence or paragraph you wish to summarise",
            fields: {
              create: [
                {
                  order: 1,
                  type: "textarea",
                  name: "content",
                  label: "Content",
                  hint: "",
                  placeholder: ""
                }
              ]
            },
            output: {
              create: {
                title: "Summarised points",
                description: "The following key points detected:",
                usePrompt: true
              }
            },
            config: {
              create: {
                model: "text-davinci-003",
                prompt:
                  "List what key points are, in simple language, based from the text:\nTEXT:\n${content}\nKEY POINTS:\n1.",
                resultPrefix: "1. ",
                maxTokens: 500,
                temperature: 0.6,
                topP: 1,
                frequencyPenalty: 1.0,
                presencePenalty: 1.0,
                stopSequences: []
              }
            }
          },
          {
            title: "Job advertisement",
            description: "Quickly create a job advertisement based on some basic details",
            heading: "Job details",
            summary: "Provide some details about the position",
            fields: {
              create: [
                {
                  order: 1,
                  type: "text",
                  name: "title",
                  label: "Job title",
                  hint: "",
                  placeholder: ""
                },
                {
                  order: 2,
                  type: "text",
                  name: "company",
                  label: "Company",
                  hint: "",
                  placeholder: ""
                },
                {
                  order: 3,
                  type: "textarea",
                  name: "skills",
                  label: "Skills or experience",
                  hint: "List the skills and experience required for the job",
                  placeholder: ""
                },
                {
                  order: 4,
                  type: "text",
                  name: "contact",
                  label: "Contact information",
                  hint: "Provide an email address or phone number",
                  placeholder: ""
                }
              ]
            },
            output: {
              create: {
                title: "Advertisment preview",
                description: "Example of a possible job application:",
                usePrompt: false
              }
            },
            config: {
              create: {
                model: "text-davinci-003",
                prompt:
                  "Create a detailed Job Ad from the following details:\nTITLE: ${title}\nCOMPANY: ${company}\nSKILLS: ${skills}\nCONTACT: ${contact}\nJOB AD:\n",
                resultPrefix: "",
                maxTokens: 500,
                temperature: 0.5,
                topP: 1,
                frequencyPenalty: 1.0,
                presencePenalty: 0,
                stopSequences: []
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
