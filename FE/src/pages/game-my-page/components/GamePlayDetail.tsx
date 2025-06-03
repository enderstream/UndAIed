import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { apiClient } from '../../../api/apiClient'

interface GameRecord {
  gameRecordId: number
  gameId: number
  roundNumber: number
  subject: string
  subjectTalk: string
  freeTalk: string
  events: string
}

interface ChatMessage {
  sequence: string
  userId: string
  number: string
  message: string
  timestamp: string
}

interface GameEvent {
  type: string
  actor: string
  target: string
  userId: string
  sequence: number
  timestamp: string
}

const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #F74A5C;
    border-radius: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #FF6B7D;
  }
`

const GamePlayDetail = ({
  isOpen,
  onClose,
  gameId,
}: {
  isOpen: boolean
  onClose: () => void
  gameId: number
}) => {
  const [activeRound, setActiveRound] = useState(1)

  const blockStyle =
    'bg-[#0000006c] border border-[#F74A5C]/40 backdrop-blur-[12.20px] text-[#fffbfb] rounded-[5px] transition-all duration-200'

  const { data: gameRecords, isLoading } = useQuery({
    queryKey: ['gameRecords', gameId],
    queryFn: async () => {
      const response = await apiClient.get(`/api/v1/game/${gameId}`)
      return response.data.data.gameRecords
    },
  })

  const parseChat = (chatString: string | undefined): ChatMessage[] => {
    if (!chatString || chatString.trim() === ' ' || chatString.trim() === '')
      return []

    return chatString
      .split('|')
      .map(chat => {
        // Chat format: {sequence} [userId] <number> (message) timestamp
        const regex =
          /\{(-?\d+)\}\s*\[([^\]]+)\]\s*<(\d+)>\s*\(([^)]+)\)\s*([\d\-T:.]+)/
        const match = chat.trim().match(regex)

        if (!match || match.length !== 6) return null

        return {
          sequence: match[3]?.trim() || '',
          userId: match[2]?.trim() || '',
          number: match[1]?.trim() || '',
          message: match[4]?.trim() || '',
          timestamp: match[5]?.trim() || '',
        }
      })
      .filter((chat): chat is ChatMessage => chat !== null)
  }

  const parseEvents = (eventString: string): GameEvent[] => {
    if (!eventString || eventString.trim() === ' ' || eventString.trim() === '')
      return []

    return eventString
      .split('|')
      .map(event => {
        const regex =
          /\{([^}]+)\}\s*\[([^\]]+)\]\s*<([^>]+)>\s*\(([^)]+)\)\s*~(\d+)~\s*([\d\-T:.]+)/
        const match = event.trim().match(regex)

        if (!match || match.length !== 7) return null

        return {
          type: match[1]?.trim() || '',
          actor: match[2]?.trim() || '',
          target: match[3]?.trim() || '',
          userId: match[4]?.trim() || '',
          sequence: parseInt(match[5]?.trim() || '0'),
          timestamp: match[6]?.trim() || '',
        }
      })
      .filter((event): event is GameEvent => event !== null)
  }

  if (!isOpen) return null
  if (isLoading)
    return <div className='text-white text-center p-8'>로딩중...</div>

  return (
    <>
      <style>{scrollbarStyles}</style>

      <div className='fixed inset-0 flex items-center justify-center z-50'>
        <div
          className='absolute inset-0 bg-[#000000a9] backdrop-blur-sm transition-opacity duration-300'
          onClick={onClose}
        />

        <div
          className={`custom-scrollbar relative w-full max-w-2xl max-h-[85vh] overflow-y-auto m-4 ${blockStyle} border-2 px-5 py-3 shadow-[0_0_12px_0_#F74A5C]`}
        >
          {/* 헤더 영역 */}
          <div className='sticky top-0 z-10 bg-black/70 backdrop-blur-xl border-b border-rose-500/40 px-4 py-5 flex justify-between items-center'>
            <h2 className='text-2xl font-bold text-white'>게임 기록</h2>
            <button onClick={onClose} className='text-2xl'>
              ✕
            </button>
          </div>

          {/* 라운드 선택 탭 */}
          <div className='sticky top-[72px] z-10 bg-black/50 backdrop-blur-lg p-4'>
            <div className='flex space-x-3'>
              {gameRecords.map((record: GameRecord) => (
                <button
                  key={record.roundNumber}
                  onClick={() => setActiveRound(record.roundNumber)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeRound === record.roundNumber
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                    : 'bg-black/40 text-gray-400 hover:bg-rose-500/20 hover:text-white'
                    }`}
                >
                  Round {record.roundNumber}
                </button>
              ))}
            </div>
          </div>

          <div className='p-4 space-y-8'>
            {gameRecords
              .filter(
                (record: GameRecord) => record.roundNumber === activeRound
              )
              .map((record: GameRecord) => (
                <div key={record.gameRecordId} className='space-y-6'>
                  <div
                    className={`p-6 ${blockStyle} border-[#773d3dc5] border-2`}
                  >
                    <div className='text-gray-300 mb-8 space-y-3'>
                      <h3 className='text-xl font-semibold text-white'>
                        라운드 {record.roundNumber}
                      </h3>
                      <div className='flex items-center justify-center text-[1.3rem] border-2 border-[#414040] space-x-3 bg-black/30 p-3 rounded-lg'>
                        <span className='text-rose-400 font-medium'>주제</span>
                        <span className='text-white'>{record.subject}</span>
                      </div>
                    </div>

                    {/* 주제 토론 섹션 */}
                    <div className='mb-8'>
                      <h4 className='text-rose-400 font-medium mb-4 flex items-center'>
                        <span className='mr-3'>주제 토론</span>
                        <div className='flex-1 h-px bg-rose-500/30' />
                      </h4>
                      <div className='space-y-2 max-h-[300px] overflow-y-auto px-2'>
                        {parseChat(record.subjectTalk)?.map((chat, idx) => (
                          <div
                            key={idx}
                            className='text-sm group hover:bg-white/10 py-0.5 rounded-lg transition-all duration-200'
                          >
                            <span className='text-rose-400 font-medium'>
                              {chat.userId.startsWith('AI-')
                                ? chat.userId
                                : `익명${chat.sequence}`}
                            </span>
                            <span className='mx-3 text-white'>
                              {chat.message}
                            </span>
                          </div>
                        )) || []}
                      </div>
                    </div>

                    {/* 자유 토론 섹션 */}
                    <div className='mb-8'>
                      <h4 className='text-rose-400 font-medium mb-4 flex items-center'>
                        <span className='mr-3'>자유 토론</span>
                        <div className='flex-1 h-px bg-rose-500/30' />
                      </h4>
                      <div className='space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar px-2'>
                        {parseChat(record.freeTalk)?.map((chat, idx) => (
                          <div
                            key={idx}
                            className='text-sm group hover:bg-white/10 px-3 py-0.5 rounded-lg transition-all duration-200'
                          >
                            <span className='text-rose-400 font-medium'>
                              {chat.userId.startsWith('AI-')
                                ? chat.userId
                                : `익명${chat.sequence}`}
                            </span>
                            <span className='mx-3 text-white'>
                              {chat.message}
                            </span>
                          </div>
                        )) || []}
                      </div>
                    </div>

                    {/* 이벤트 섹션 */}
                    <div>
                      <h4 className='text-rose-400 font-medium mb-4 flex items-center'>
                        <span className='mr-3'>이벤트</span>
                        <div className='flex-1 h-px bg-rose-500/30' />
                      </h4>
                      <div className='space-y-3'>
                        {parseEvents(record.events)?.map((event, idx) => (
                          <div
                            key={idx}
                            className='text-sm bg-black/30 px-4 py-0.5 rounded-lg transition-all duration-200 hover:bg-black/40'
                          >
                            {event.type === 'vote' ? (
                              <span className='text-white'>
                                <span className='text-rose-400 font-medium'>
                                  {event.actor}
                                </span>{' '}
                                이(가){' '}
                                <span className='text-rose-400 font-medium'>
                                  익명{event.target}
                                </span>
                                에게 투표했습니다
                              </span>
                            ) : event.type === 'vote_result' ? (
                              <span className='text-white'>
                                투표가 완료되었습니다
                              </span>
                            ) : event.type === 'infection' ? (
                              <span className='text-white'>
                                <span className='text-rose-400 font-medium'>
                                  {event.userId}
                                </span>
                                이(가) 감염되었습니다
                              </span>
                            ) : null}
                          </div>
                        )) || []}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default GamePlayDetail
