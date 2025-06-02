import type { IMessage } from '../../../types/gameroom'

interface ChatBubbleProps {
  message: IMessage
  playerName: string | undefined
  iconArr: string[]
}

const ChatBubble = ({ message, playerName, iconArr }: ChatBubbleProps) => {
  const isMine = message.isMine

  const playerColor = [
    '',
    ['253', '60', '47', iconArr[1]],
    ['252', '158', '37', iconArr[2]],
    ['250', '255', '144', iconArr[3]],
    ['59', '140', '51', iconArr[4]],
    ['45', '58', '201', iconArr[5]],
    ['176', '65', '253', iconArr[6]],
    ['255', '255', '255', iconArr[7]],
    ['253', '99', '206', iconArr[8]],
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
        <img
          className='w-6 h-6 mr-1'
          src={
            playerColor[message.player]
              ? playerColor[message.player][3]
              : undefined
          }
          alt='player-icon'
        />
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
