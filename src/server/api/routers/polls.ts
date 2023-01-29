import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const pollRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        authorId: z.string().optional().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!input.authorId) {
        return null;
      }
      return await ctx.prisma.poll.findMany({
        where: {
          creatorId: input.authorId,
        },
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
  vote: protectedProcedure
    .input(
      z.object({
        pollId: z.string(),
        optionId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const usersVote = await ctx.prisma.vote.findFirst({
        where: {
          userId: ctx.session.user.id,
          pollId: input.pollId,
        },
      });
      if (usersVote) {
        throw new Error("You can only vote once per poll");
      }
      const vote = await ctx.prisma.vote.create({
        data: {
          option: {
            connect: {
              id: input.optionId,
            },
          },
          Poll: {
            connect: {
              id: input.pollId,
            },
          },

          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
      return vote;
    }),
  getOptionVotes: publicProcedure
    .input(
      z.object({
        pollId: z.string(),
        optionId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const votes = await ctx.prisma.vote.count({
        where: {
          optionId: input.optionId,
          pollId: input.pollId,
        },
      });
      return votes;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const poll = await ctx.prisma.poll.findUnique({
        where: {
          id: input.id,
        },
        include: {
          creator: true,
        },
      });
      if (!poll) {
        throw new Error("Poll not found");
      }
      if (poll.creator.id !== ctx.session.user.id) {
        throw new Error("You can only delete your own polls");
      }
      await ctx.prisma.poll.delete({
        where: {
          id: input.id,
        },
      });
      return true;
    }),
});
