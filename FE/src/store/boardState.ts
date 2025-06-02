import { atom } from 'recoil'

export const currentPageState = atom({
  key: 'currentPageState',
  default: 1,
})

export const boardRefreshState = atom({
  key: 'boardRefreshState',
  default: 0,
})
