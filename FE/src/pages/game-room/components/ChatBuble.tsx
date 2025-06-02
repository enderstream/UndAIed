import type { IMessage } from '../../../types/gameroom'
import { getPlayerIcon } from '../../../util/PlayerIcon'

interface ChatBubbleProps {
  message: IMessage
  playerName: string | undefined
  icon: number | undefined
}

const ChatBubble = ({ message, playerName, icon }: ChatBubbleProps) => {
  const isMine = message.isMine
  const iconStr = getPlayerIcon(icon ? icon : 1)

  const playerColor = [
    '',
    ['253', '60', '47'],
    ['252', '158', '37'],
    ['250', '255', '144'],
    ['59', '140', '51'],
    ['45', '58', '201'],
    ['176', '65', '253'],
    ['255', '255', '255'],
    ['253', '99', '206'],
  ]

  // message.player가 유효하지 않은 경우 기본값 사용
  const currentPlayer = playerColor[message.player] || playerColor[0]

  return (
    <div>
      {/* 닉네임/아이콘 영역 */}
      <div
        className={`flex mb-1 items-center ${
          isMine ? 'flex-row-reverse' : 'justify-start'
        }`}
      >
        <img className='w-6 h-6 mr-1' src={iconStr} alt='player-icon' />
        <span className='text-white'>{playerName}</span>
      </div>

      {/* 말풍선(채팅) 영역 */}
      <div className={`flex mb-4 ${isMine ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`max-w-[70%] py-2 px-3 text-sm bg-[rgb(9,9,11)] text-[#dddddd] border-2 border-solid shadow-[0px_0px_14px_rgba(255,255,255,0.25)] break-all ${
            isMine ? 'rounded-b-lg rounded-tl-lg' : 'rounded-b-lg rounded-tr-lg'
          }`}
          style={{
            borderColor: `rgba(${currentPlayer[0]}, ${currentPlayer[1]}, ${currentPlayer[2]}, 0.4)`,
          }}
        >
          {message.text}
        </div>
      </div>
    </div>
  )
}

export default ChatBubble
