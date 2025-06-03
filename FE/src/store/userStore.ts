import { IUser } from '@/types/user'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserStore {
  user: IUser
  setUser: (user: IUser) => void
  updateUser: (partialUser: Partial<IUser>) => void
  logout: () => void
  login: (userData: Omit<IUser, 'isLogin'>) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: {
        isLogin: false,
        email: 'email@example.com',
        token: '',
        nickname: 'nickname',
        totalWin: 0,
        totalLose: 0,
        profileImage: 0,
      },
      
      setUser: (user) => set({ user }),
      
      updateUser: (partialUser) => 
        set((state) => ({ 
          user: { ...state.user, ...partialUser } 
        })),
      
      logout: () => 
        set({ 
          user: {
            isLogin: false,
            email: 'email',
            token: '',
            nickname: 'nickname',
            totalWin: 0,
            totalLose: 0,
            profileImage: 0,
          }
        }),
      
      login: (userData) => 
        set({ 
          user: { ...userData, isLogin: true } 
        }),
    }),
    {
      name: 'userPersist',
    }
  )
)

// ===== Show Intro Store =====
interface ShowIntroStore {
  showIntro: boolean
  setShowIntro: (show: boolean) => void
  toggleShowIntro: () => void
}

export const useShowIntroStore = create<ShowIntroStore>((set) => ({
  showIntro: false,
  setShowIntro: (show) => set({ showIntro: show }),
  toggleShowIntro: () => set((state) => ({ showIntro: !state.showIntro })),
}))