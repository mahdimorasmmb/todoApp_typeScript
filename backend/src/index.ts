import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";

import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { z } from "zod";
import morgan from "morgan";

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(morgan('common'))

// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();
const appRouter = t.router({
  addTodo: t.procedure
    .input(z.object({ task: z.string().optional() }))
    .mutation(async ({ input: { task } }) => {
      const result = await prisma.todo.create({
        data: {
          task: task ? task : "",
          handNotes: "",
          description: "",
        },
      });
    }),
  todos: t.procedure
    .input(z.object({ isDone: z.string().optional() }))
    .query(async ({ input }) => {
      const { isDone } = input;

      if (isDone === "true") {
        const filteredTodos = await prisma.todo.findMany({
          where: {
            isDone: true,
          },
        });
        return filteredTodos;
      } else if (isDone === "false") {
        const filteredTodos = await prisma.todo.findMany({
          where: {
            isDone: false,
          },
        });
        return filteredTodos;
      }
      const items = await prisma.todo.findMany();
      if (items) return items;
    }),
  todo: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id } }) => {
      const item = await prisma.todo.findFirst({
        where: {
          id,
        },
      });
      if (!item) throw new Error("not find item in data Base");

      return item;
    }),
  deleteTodo: t.procedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id } }) => {
      const item = await prisma.todo.delete({
        where: {
          id,
        },
      });
      return item;
    }),
  updateTodo: t.procedure
    .input(
      z.object({
        id: z.string(),
        description: z.string().optional(),
        task: z.string().optional(),
        isDone: z.boolean().optional(),
        handNotes: z.string().optional(),
      })
    )
    .mutation(
      async ({ input: { id, description, task, isDone, handNotes } }) => {
        await prisma.todo.update({
          where: { id },
          data: {
            description: description ? description : "",
            task: task ? task : "",
            isDone,
            handNotes: handNotes ? handNotes : "",
          },
        });
      }
    ),
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
