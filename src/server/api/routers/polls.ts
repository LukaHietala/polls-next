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
        include: {
          options: true,
          creator: true,
          votes: true,
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
      const usersPolls = await ctx.prisma.poll.count({
        where: {
          creatorId: ctx.session.user.id,
        },
      });
      if (usersPolls >= 5) {
        throw new Error("You can only create 5 polls :(");
      }
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
