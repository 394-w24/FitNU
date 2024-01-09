import { create } from "zustand";

const useProfileStore = create((set) => ({
  profile: null,
  setUser: (profile) => set({ profile }),
}));

export default useProfileStore;
