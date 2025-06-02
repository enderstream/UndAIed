import { atom } from 'recoil'
import type { GameRoom } from '../types/gameRoomInfo'

export const gameMainState = atom<GameRoom[]>({
  key: 'gameRoomsState',
  default: [],
})
