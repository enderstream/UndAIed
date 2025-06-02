export interface IAnonimus {
  number: number //플레이어 아이디
  died: boolean
  inGame: boolean
}

export interface IGameResultSend {
  winner: string
  message: string
  players: {
    number: number
    nickname: string
    died: boolean
    infected: boolean
  }[]
}
