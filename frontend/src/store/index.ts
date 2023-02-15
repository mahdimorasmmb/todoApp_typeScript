import { atom } from "jotai";
import { create } from "zustand";

export const taskAtom = atom("");

// export const appSideDrawer = atom({});

interface AppState {
  appState: {
    editTodoId: string;
    isDrawerOpen: boolean;
  };
  open: (taskId: string) => void;
  close: () => void;
}

export const useAppState = create<AppState>()((set) => ({
  appState: {
    editTodoId: "",
    isDrawerOpen: false,
  },
  open: (taskId) =>
    set((state) => {
      return {
        appState: { editTodoId:taskId,isDrawerOpen:true },
      };
    }),
  close: () =>
    set((state) => {
      return {
        appState: { editTodoId:"",isDrawerOpen:false },
      };
    }),
}));
