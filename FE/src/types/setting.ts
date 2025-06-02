export interface SettingsStateType {
  isFullscreen: boolean
  isMuted: boolean
  volume: number
}

export interface SettingProps {
  title: string
  first: boolean | null
  setFirst: (value: boolean) => void | null
  onClose: () => void
  isSettingsOpen: boolean
}
