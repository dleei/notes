import { create } from "zustand";

interface UserStore {
  name: string;
  setName: (name: string) => void;

  token: string;
  setToken: (token: string) => void;
  delToken: () => void;
}

const useUserStore = create<UserStore>((set) => {
  return {
    name: "",
    setName: (name: string) => set({ name }),

    token: "",
    setToken: (token: string) => set({ token }),
    delToken: () => set({ token: "" }),
  };
});

export default useUserStore;
