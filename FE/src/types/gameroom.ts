export interface IPlayer {
  enterId: number
  nickname: string
  profileImage: number
  isHost: boolean
}

export interface IMessage {
  player: number
  nickname: string
  text: string
  isMine: boolean // true면 내가 보낸 메시지, false면 상대방 메시지
}
