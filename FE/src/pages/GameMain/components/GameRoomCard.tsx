import { memo } from 'react'
import type { GameRoomCardProps } from '../../../types/gameRoomInfo'
import { useClickSound } from '../../../hooks/useClickSound'

const blockStyle =
  'bg-[#5349507a] border border-[#f74a5c]/60 backdrop-blur-[12.20px] text-[#fffbfb]  rounded-[5px]  transition-all duration-200 '
const blockHover =
  'hover:bg-[#f8376467] hover:border-[#f93c4f] hover:shadow-[0_0_15px_0] hover:shadow-[#F74A5C]'
const blockActive =
  'active:bg-[#f837644e] active:border-[#f837644e] active:shadow-sm'
const GameRoomCard = ({ room }: GameRoomCardProps) => {
  const click = useClickSound()

  return (
    <ul className='space-y-2.5'>
      <li
        onMouseDown={click}
        className={`h-8 bg-[#241818de] grid md:grid-cols-[6rem,1fr,8rem] grid-cols-[4rem,1fr,5rem] items-center mb-2 px-2 ${blockStyle} ${blockHover} ${blockActive} cursor-pointer`}
      >
        <span className='ml-2'>{room.roomId}</span>
        <span className='truncate'>{room.roomTitle}</span>
        <span className='text-right mr-2'>{room.currentPlayerNum} / 6</span>
      </li>
    </ul>
  )
}

export default memo(GameRoomCard)
