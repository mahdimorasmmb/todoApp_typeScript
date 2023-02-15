import { ComponentProps, ElementType, useState } from "react";
import { useStore } from "zustand";
import {  useAppState } from "../store";

export const withSideDrawer =
  (Component: ElementType) => (props: ComponentProps<typeof Component>) => {
   const {appState} = useAppState()
    return (
     appState.isDrawerOpen ? (
        <div className="absolute top-0 right-0 bottom-0 w-[400px] overflow-auto bg-white py-3 px-4 shadow-[0_0_5px_rgb(78,78,78)]">
          <Component {...props}  />
        </div>
      ): null
    );
  };
