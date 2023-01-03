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
      const config = await ctx.prisma.configuration.findUnique({
        where: {
          toolId: input.id
        }
      })
      if (config) {
        const completion = await openai.createCompletion({
          model: config.model,
          prompt: interpolate(input.params, config.prompt),
          max_tokens: config.maxTokens,
          temperature: config.temperature,
          top_p: config.topP,
          frequency_penalty: config.frequencyPenalty,
          presence_penalty: config.presencePenalty,
          best_of: 1,
          stream: false,
          stop: config.stopSequences
        })

        if (completion.data && completion.data.choices) {
          const data = completion.data.choices[0]
          if (data) {
            outputs = `${config.resultPrefix}${data.text}`
              .split("\n")
              .map(s => s.trim())
              .filter(s => s !== "")
          }
        }
      }
      return outputs
    })
})
