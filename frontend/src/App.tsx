import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
import { trpc } from "./utils/trpc";

import TodoContainer from "./containers/TodoContainer";
import Header from "./partials/Header/Header";
import EditContainer from "./containers/EditContainer";
import { useAtom } from "jotai";
import { taskAtom } from "./store/selectedTask";

export function App() {
  const [taskId] = useAtom(taskAtom);
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:4000/trpc",
          // optional
          // headers() {
          //   return {
          //     authorization: getAuthCookie(),
          //   };
          // },
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <div className="mr-auto ml-auto w-[500px]">
          <TodoContainer />
         {taskId &&  <EditContainer taskId={taskId} />}
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
