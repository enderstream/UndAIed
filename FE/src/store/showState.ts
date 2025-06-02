import { atom } from 'recoil'

export const setShowIntroState = atom<boolean>({
  key: 'setShowIntroState',
  default: false,
})
