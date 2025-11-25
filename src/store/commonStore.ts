import { create } from "zustand";

interface CommonState {
  // Data
  isSidebarOpen: boolean;

  // Actions
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  resetSidebarOpen: () => void;
}

const useCommonStore = create<CommonState>((set) => ({
  isSidebarOpen: false,
  setIsSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
  resetSidebarOpen: () => set({ isSidebarOpen: false }),
}));

export default useCommonStore;