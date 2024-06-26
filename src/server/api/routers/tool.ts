import { createTRPCRouter, publicProcedure } from "../trpc"
import { z } from "zod"

export const toolRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.tool.findMany({
      include: {
        category: {
          select: {
            name: true
          }
        }
      }
    })
  }),
  get: publicProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.tool.findUnique({
        where: {
          id: input.id
        },
        include: {
          category: {
            select: {
              name: true
            }
          },
          fields: {
            select: {
              type: true,
              name: true,
              label: true,
              placeholder: true,
              hint: true,
              validationRules: {
                select: {
                  type: true,
                  message: true,
                  primary: true,
                  secondary: true
                }
              }
            },
            orderBy: {
              order: "asc"
            }
          },
          output: {
            select: {
              type: true,
              title: true,
              description: true
            }
          }
        }
      })
    })
})
