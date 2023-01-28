import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

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
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        options: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const poll = await ctx.prisma.poll.create({
        data: {
          title: input.title,
          description: input.description,
          options: {
            create: input.options.map((title) => ({ title })),
          },
          creator: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });

      return poll;
    }),
});
