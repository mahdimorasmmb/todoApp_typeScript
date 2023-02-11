import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";

import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { z } from "zod";

const prisma = new PrismaClient();
const app = express();
app.use(cors());

// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();
const appRouter = t.router({
  addTodo: t.procedure
    .input(z.object({ task: z.string() }))
    .mutation(async (req) => {
      const {
        input: { task },
      } = req;

      const result = await prisma.todo.create({
        data: {
          task,
          description: "",
          handNotes: "",
        },
      });
      console.log(result);
    }),
  todos: t.procedure
    .input(z.object({ isDone: z.boolean().optional() }))
    .query(async ({ input }) => {
      const { isDone } = input;

      if (isDone) {
        const filteredTodos = await prisma.todo.findMany({
          where: {
            isDone: true,
          },
        });
        return filteredTodos;
      }

      return await prisma.todo.findMany();
    }),
  todo: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;

      const item = await prisma.todo.findFirst({
        where: {
          id,
        },
      });
      return item;
    }),
  deleteTodo: t.procedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;

      const item = await prisma.todo.delete({
        where: {
          id,
        },
      });
      return item;
    }),
});

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(4000, () => {
  console.log("run server ", "4000");
});

export type AppRouter = typeof appRouter;
