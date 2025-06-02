import playerIcon1 from '../assets/player-icon/player-icon-1.svg'
import playerIcon2 from '../assets/player-icon/player-icon-2.svg'
import playerIcon3 from '../assets/player-icon/player-icon-3.svg'
import playerIcon4 from '../assets/player-icon/player-icon-4.svg'
import playerIcon5 from '../assets/player-icon/player-icon-5.svg'
import playerIcon6 from '../assets/player-icon/player-pink.svg'
import playerIcon7 from '../assets/player-icon/player-purple.svg'
import playerIcon8 from '../assets/player-icon/player-white.svg'

export const getPlayerIcon = (profileImageNum: number) => {
  switch (profileImageNum) {
    case 1:
      return playerIcon1
    case 2:
      return playerIcon2
    case 3:
      return playerIcon3
    case 4:
      return playerIcon4
    case 5:
      return playerIcon5
    case 6:
      return playerIcon6
    case 7:
      return playerIcon7
    case 8:
      return playerIcon8
    default:
      return playerIcon1
  }
}

export const PlayerIcons = [
  { id: 1, src: playerIcon1 },
  { id: 2, src: playerIcon2 },
  { id: 3, src: playerIcon3 },
  { id: 4, src: playerIcon4 },
  { id: 5, src: playerIcon5 },
  { id: 6, src: playerIcon6 },
  { id: 7, src: playerIcon7 },
  { id: 8, src: playerIcon8 },
]
