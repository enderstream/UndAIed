export interface GameRoom {
  roomId: number
  roomTitle: string
  isPrivate: boolean
  currentPlayerNum: number
  playing: boolean
}

export interface GameRoomResponse {
  rooms: GameRoom[]
  totalPage: number
}

export interface GameRoomCardProps {
  room: GameRoom
}

export interface RoomState {
  rooms: GameRoom[]
  page: number
  loading: boolean
  hasMore: boolean
  totalPages: number
}
