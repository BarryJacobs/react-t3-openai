import { createTRPCRouter } from "./trpc"
import { toolRouter } from "./routers/tool"
import { openaiRouter } from "./routers/openai"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  tool: toolRouter,
  openai: openaiRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
