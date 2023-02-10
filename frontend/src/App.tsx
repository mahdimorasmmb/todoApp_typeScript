import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
import { trpc } from "./utils/trpc";

import TodoContainer from "./containers/TodoContainer/TodoContainer";
import Header from "./partials/Header/Header";

export function App() {
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
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
function getAuthCookie(): string | string[] | undefined {
  throw new Error("Function not implemented.");
}

