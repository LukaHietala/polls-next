import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const pollRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.poll.findMany({
      include: {
        options: true,
        creator: true,
        votes: true,
      },
    });
  }),

  getOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.poll.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
