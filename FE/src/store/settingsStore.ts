import { SettingsStateType } from '@/types/setting'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ===== Settings Store =====
interface SettingsStore {
  settings: SettingsStateType
  setSettings: (settings: SettingsStateType) => void
  updateSettings: (partialSettings: Partial<SettingsStateType>) => void
  toggleFullscreen: () => void
  toggleMute: () => void
  setVolume: (volume: number) => void
  resetSettings: () => void
}

const defaultSettings: SettingsStateType = {
  isFullscreen: false,
  isMuted: true,
  volume: 1.0,
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      
      // 전체 설정 업데이트
      setSettings: (settings) => set({ settings }),
      
      // 부분 설정 업데이트
      updateSettings: (partialSettings) => 
        set((state) => ({ 
          settings: { ...state.settings, ...partialSettings } 
        })),
      
      // 풀스크린 토글
      toggleFullscreen: () => 
        set((state) => ({ 
          settings: { ...state.settings, isFullscreen: !state.settings.isFullscreen } 
        })),
      
      // 음소거 토글
      toggleMute: () => 
        set((state) => ({ 
          settings: { ...state.settings, isMuted: !state.settings.isMuted } 
        })),
      
      // 볼륨 설정
      setVolume: (volume) => 
        set((state) => ({ 
          settings: { ...state.settings, volume } 
        })),
      
      // 설정 초기화
      resetSettings: () => set({ settings: defaultSettings }),
    }),
    {
      name: 'appSettings', // localStorage key (기존과 동일)
    }
  )
)