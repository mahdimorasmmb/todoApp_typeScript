// utils/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import  { AppRouter } from '../server/src';

export const trpc = createTRPCReact<AppRouter>();


type RouterInput = inferRouterInputs<AppRouter>
type RouterOutput = inferRouterOutputs<AppRouter>;

export type TodoType = RouterOutput['todo']