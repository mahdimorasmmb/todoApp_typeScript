import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { httpBatchLink } from "@trpc/client";
import React, { useEffect, useState } from "react";
import { trpc } from "./utils/trpc";

import TodoContainer from "./containers/TodoContainer";
import Header from "./partials/Header/Header";
import EditContainer from "./containers/EditContainer";
import { withSideDrawer } from "./hoc/withSideDrawer";
import StatsContainer from "./containers/StatsContainer";

const EditContainerWithSideDrawer = withSideDrawer(EditContainer);
export function App() {
  const [location, setLocation] = useState(window.location.pathname);
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:4000/trpc",
        }),
      ],
    })
  );

  useEffect(() => {
    document.querySelectorAll("a").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();

        const link = (e.target as HTMLAnchorElement).href;

        if (window.history.state?.pathLink !== link) {
          window.history.pushState({ pathLink: link }, "", link);
          setLocation(window.location.pathname);
        }
      });
    });

    window.addEventListener("popstate", (e) => {
      setLocation((e.target as Window).location.pathname);
    });
  }, []);
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <div className="mr-auto ml-auto w-[500px]">
          {location === "/" && (
            <>
              <TodoContainer />
              <EditContainerWithSideDrawer />
            </>
          )}

          {location === "/stats" && <StatsContainer />}
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
