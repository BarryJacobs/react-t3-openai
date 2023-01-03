import { router } from "../trpc"
import { toolRouter } from "./tool"
import { openaiRouter } from "./openai"

export const appRouter = router({
  tool: toolRouter,
  openai: openaiRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
