import { router, publicProcedure } from "../trpc"
import { interpolate } from "utils"
import { openai } from "utils/openai"
import { record, z } from "zod"

export const openaiRouter = router({
  completion: publicProcedure
    .input(
      z.object({
        id: z.string(),
        params: record(z.string(), z.string())
      })
    )
    .query(async ({ ctx, input }) => {
      let outputs: string[] = []
      const tool = await ctx.prisma.tool.findUnique({
        where: {
          id: input.id
        },
        include: {
          config: {
            select: {
              model: true,
              prompt: true,
              resultPrefix: true,
              maxTokens: true,
              temperature: true,
              topP: true,
              frequencyPenalty: true,
              presencePenalty: true,
              stopSequences: true
            }
          },
          output: {
            select: {
              type: true
            }
          }
        }
      })

      if (tool && tool.config && tool.output) {
        const completion = await openai.createCompletion({
          model: tool.config.model,
          prompt: interpolate(input.params, tool.config.prompt),
          max_tokens: tool.config.maxTokens,
          temperature: tool.config.temperature,
          top_p: tool.config.topP,
          frequency_penalty: tool.config.frequencyPenalty,
          presence_penalty: tool.config.presencePenalty,
          best_of: 1,
          stream: false,
          stop: tool.config.stopSequences.length > 0 ? tool.config.stopSequences : null
        })

        if (completion.data && completion.data.choices) {
          const response = completion.data.choices[0]
          if (response && response.text) {
            if (tool.output.type === "code") outputs.push(response.text.trim())
            else {
              outputs = `${tool.config.resultPrefix}${response.text}`
                .split("\n")
                .map(s => s.trim())
                .filter(s => s !== "")
            }
          }
        }
      }
      return outputs
    })
})
