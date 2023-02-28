import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { httpBatchLink } from "@trpc/client";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { trpc } from "./utils/trpc";


import Header from "./partials/Header/Header";

import {  Route, Routes } from "react-router-dom";

import PageLayout from "./components/PageLayout";

const EditContainerWithSideDrawerLayzy = lazy(
  () => import("./containers/EditContainer")
);
const TodoContainerLayzy = lazy(() => import("./containers/TodoContainer"));
const StatsContainerLayzy = lazy(() => import("./containers/StatsContainer"));
const AboutContainerLayzy = lazy(() => import("./containers/AboutContainer"));


export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: import.meta.env.VITE_REACT_APP_BASE_URL,
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
       
          <Header />
          <PageLayout>
            <Routes>
              <Route
                path="/"
                element={
                  <Suspense fallback={<div>Loading ... .</div>}>
                    <TodoContainerLayzy />
                    <EditContainerWithSideDrawerLayzy />
                  </Suspense>
                }
              />
              <Route
                path="/stats"
                element={
                  <Suspense fallback={<div>Loading ... .</div>}>
                    <StatsContainerLayzy />
                  </Suspense>
                }
              />
              <Route
                path="/about"
                element={
                  <Suspense fallback={<div>Loading ... .</div>}>
                    <AboutContainerLayzy />
                  </Suspense>
                }
              />
            </Routes>
          </PageLayout>
          <ReactQueryDevtools initialIsOpen={false} />
       
      </QueryClientProvider>
    </trpc.Provider>
  );
}
