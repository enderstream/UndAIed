import { atom } from 'recoil'

export const isGameEndState = atom<boolean>({
  key: 'isGameEndState',
  default: false,
})

export const isUserDiedState = atom<boolean>({
  key: 'isUserDiedState',
  default: false,
})

interface IUserMemo {
  suspicious: boolean
  memo: string
}

export const userMemoState = atom<IUserMemo[]>({
  key: 'userMemoState',
  default: Array.from({ length: 8 }, () => ({
    suspicious: false,
    memo: '',
  })),
})
