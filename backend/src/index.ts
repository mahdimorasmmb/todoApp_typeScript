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
    .input(z.object({ todo: z.string() }))
    .mutation(async (req) => {
      const {
        input: { todo },
      } = req;

      const result = await prisma.todo.create({
        data: {
          content: todo,
        },
      });
      console.log(result);
    }),
  todos: t.procedure.query(async () => {
    const result = await prisma.todo.findMany();
    console.log(result);

    return result;
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
