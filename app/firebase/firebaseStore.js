import { create } from 'zustand'

export const useFirebaseStore = create((set) => ({
    user: null,
    setUser: () => set((state) => ({ user: state })),
    removeUser: () => set({ user: null }),

}))
