import { useCallback, useEffect, useRef, useState } from 'react'
// import { useNavigate, useParams } from "react-router-dom";
import PlayerIcon1 from '../../assets/player-icon/player-icon-1.svg'
import PlayerIcon2 from '../../assets/player-icon/player-icon-2.svg'
import PlayerIcon3 from '../../assets/player-icon/player-icon-3.svg'
import PlayerIcon4 from '../../assets/player-icon/player-green.svg'
import PlayerIcon5 from '../../assets/player-icon/player-icon-4.svg'
import PlayerIcon6 from '../../assets/player-icon/player-icon-5.svg'
import PlayerIcon7 from '../../assets/player-icon/player-white.svg'
import PlayerIcon8 from '../../assets/player-icon/player-pink.svg'
// import PlayerIcon1 from "../../assets/game-icon/1.webp";
// import PlayerIcon2 from "../../assets/game-icon/2.webp";
// import PlayerIcon3 from "../../assets/game-icon/3.webp";
// import PlayerIcon4 from "../../assets/game-icon/4.webp";
// import PlayerIcon5 from "../../assets/game-icon/5.webp";
// import PlayerIcon6 from "../../assets/game-icon/6.webp";
// import PlayerIcon7 from "../../assets/game-icon/7.webp";
// import PlayerIcon8 from "../../assets/game-icon/8.webp";
import ChatBubble from './components/ChatBuble'
import SystemBubble from './components/SystemBubble'
import ChatForm from './components/ChatForm'
import { useSocket } from '../../hooks/useSocket'
import RightGameSideBar from './components/RightGameSideBar'
import LeftGameSideBar from './components/LeftGameSideBar'
import type { IMessage } from '../../types/gameroom'
import type { IAnonimus, IGameResultSend } from '../../types/gameplay'
import { toast } from 'sonner'
import type { STAGE_INFO } from './components/info'
import { useRecoilState, useResetRecoilState } from 'recoil'
import {
  isGameEndState,
  // isUserDiedState,
  userMemoState,
} from '../../store/gamePlayState'
import GameEndModal from './components/GameEndModal'
import Settings from '../../util/Setting'

interface IChatSend {
  number: number
  content: string
}

interface IGameInfoSend {
  gameId: number
  round: number
  stage: keyof typeof STAGE_INFO
  timer: number
  players: IAnonimus[]
}

// interface IGameInfoEmitDone {
//   success: boolean;
//   errorMessage: string;
//   playerId: number;
// }

interface IGameChatEmitDone {
  success: boolean
  errorMessage?: string
  data: null
}
interface IVoteEmitDone {
  success: boolean
  errorMessage?: string
  data: {
    number: number // 투표 대상자 번호
    message: string
  }
}

const GamePlay = () => {
  // const { number } = useParams();
  const scrollRef = useRef<HTMLDivElement | null>(null)
  // const navigate = useNavigate();

  //플레이어 본인
  const [playerEnterId, setPlayerEnterId] = useState<number>()
  const [playerInfo, setPlayerInfo] = useState<IAnonimus | undefined>()

  //게임 전체 정보보 (유저 정보 포함)
  const [gameInfo, setGameInfo] = useState<IGameInfoSend>()
  const [gameResult, setGameResult] = useState<IGameResultSend>()

  // const [isUserDead, setIsUserDead] = useRecoilState<boolean>(isUserDiedState);

  const [isGameEnd, setIsGameEnd] = useRecoilState(isGameEndState)

  const resetUserMemo = useResetRecoilState(userMemoState)

  useEffect(() => {
    // 컴포넌트가 마운트될 때(즉, 페이지가 로드될 때) state 초기화
    resetUserMemo()
  }, [resetUserMemo])

  //유저 아이콘
  const iconArr = [
    '',
    PlayerIcon1,
    PlayerIcon2,
    PlayerIcon3,
    PlayerIcon4,
    PlayerIcon5,
    PlayerIcon6,
    PlayerIcon7,
    PlayerIcon8,
  ]

  const [messages, setMessages] = useState<IMessage[]>([
    // {
    //   player: 0,
    //   nickname: "사회자",
    //   text: "게임이 시작되었습니다.",
    //   isMine: false,
    // },
    // { player: 1, text: "안녕하세요", isMine: false, nickname: "익명1" },
    // { player: 2, text: "ㅎㅇ", isMine: false, nickname: "익명2" },
    // { player: 3, text: "안녕하세요오", isMine: true, nickname: "익명3" },
    // { player: 4, text: "반갑습니다", isMine: false, nickname: "익명4" },
    // {
    //   player: 5,
    //   text: "안녕, 반가워! 우리 이번 게임 잘해보자^^안녕, 반가워! 우리 이번 게임 잘해보자^^안녕, 반가워! 우리 이번 게임 잘해보자^^",
    //   isMine: false,
    //   nickname: "익명5",
    // },
    // { player: 6, text: "하이", isMine: false, nickname: "익명6" },
    // {
    //   player: 7,
    //   text: "벌써 누군지 알겠는데",
    //   isMine: false,
    //   nickname: "익명7",
    // },
    // { player: 8, text: "그러니까", isMine: false, nickname: "익명8" },
    // { player: 3, text: "어쨋든 난 아님", isMine: true, nickname: "익명3" },
  ])

  //socket 훅 사용
  const socket = useSocket()

  useEffect(() => {
    if (!socket) {
      return
    }

    //여기서 받는 데이터는 data.아래에 바로 데이터 존재
    socket.on('game:info:send', (data: IGameInfoSend) => {
      if (data) {
        setGameInfo(data)
      }
    })

    //게임 결과 받기
    //useEffect로 gameResult가 초기 값이 아니면 결과 화면 출력하게 하자
    //IGameResultSend
    socket.on('game:result:send', (data: any) => {
      setIsGameEnd(true)
      if (data) {
        setGameResult(data)
      }
    })

    return () => {
      socket.off('game:info:send')
      socket.off('game:result:send')
    }
  }, [socket, playerEnterId, gameInfo])

  useEffect(() => {
    if (!socket) {
      return
    }

    socket.on('game:chat:send', (data: IChatSend) => {
      debugger
      if (data) {
        if (data.number === 0) {
          const newMessage: IMessage = {
            player: data.number,
            nickname: '사회자',
            text: data.content,
            isMine: false,
          }
          setMessages(prevMessages => [...prevMessages, newMessage])
        } else if (gameInfo) {
          const player = gameInfo.players.find(
            player => player.number === data.number
          )
          if (player) {
            const newMessage: IMessage = {
              player: player.number,
              nickname: `익명${player.number}`,
              text: data.content,
              isMine: Boolean(player.number === playerEnterId),
            }
            setMessages(prevMessages => [...prevMessages, newMessage])
          }
        }
      }
    })

    //주제 토론에서 모아두었던 채팅 한번에 주기
    socket.on('chat:subject:send', (data: IChatSend[]) => {
      debugger
      if (data) {
        setMessages(prevMessages => [
          ...prevMessages,
          ...data.map(msg => ({
            player: msg.number,
            nickname: `익명${msg.number}`,
            text: msg.content,
            isMine: msg.number === playerEnterId,
          })),
        ])
      }
    })

    return () => {
      socket.off('game:chat:send')
      socket.off('chat:subject:send')
    }
  }, [socket, messages, playerEnterId, gameInfo])

  //emit 이벤트 모음
  const handleGameInfo = useCallback(() => {
    // 방 입장 요청
    if (!socket) {
      return
    }

    socket.emit(
      'game:info:emit',
      {},
      (data: { success: boolean; errorMessage: string; number: number }) => {
        //여기서 받는 건 없음

        if (data.success) {
          setPlayerEnterId(data.number)
          return
        } else {
          toast.error(data.errorMessage)
          return
        }
      }
    )
  }, [socket, playerEnterId])

  //실행하기
  useEffect(() => {
    if (socket) {
      handleGameInfo()
    }
  }, [socket, handleGameInfo])

  //나 찾기기
  useEffect(() => {
    debugger
    setPlayerInfo(
      gameInfo?.players.find(player => player.number === playerEnterId)
    )
  }, [gameInfo, playerEnterId])

  useEffect(() => {
    if (playerInfo) {
      // setIsUserDead(playerInfo.died);
    }
  }, [playerInfo])

  const handleGameChat = useCallback(
    (input: string) => {
      debugger
      if (!socket || !playerEnterId) {
        return
      }
      socket.emit(
        'game:chat:emit',
        {
          content: input,
        },
        ({ success, errorMessage }: IGameChatEmitDone) => {
          debugger
          if (success) {
          } else {
            console.error('채팅 전송 오류:', errorMessage)
            toast.error(errorMessage)
          }
        }
      )
    },
    [socket, playerEnterId]
  )

  const handleVoteSubmit = useCallback(
    (target: number) => {
      debugger
      if (!socket) {
        return
      }
      socket.emit(
        'vote:submit:emit',
        {
          target,
        },
        ({ success, errorMessage, data }: IVoteEmitDone) => {
          debugger
          if (success) {
            toast.success(`익명${data.number}에게 ${data.message}`)
          } else {
            console.error('채팅 전송 오류:', errorMessage)
            toast.error(errorMessage)
          }
        }
      )
    },
    [socket]
  )

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ block: 'end' })
  }
  //socket 시작작

  useEffect(() => {
    // 새로운 메시지가 추가될 때 스크롤을 아래로 이동
    scrollToBottom()
  }, [messages])
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <div className='bg-[#07070a]'>
      {isGameEnd && gameResult !== undefined ? (
        <GameEndModal gameResult={gameResult} />
      ) : (
        <></>
      )}
      <div className='background-gradient max-w-[90rem] mx-auto px-4 sm:px-4 md:px-6'>
        <LeftGameSideBar
          nickname={
            playerInfo
              ? `익명${String(playerInfo.number)}`
              : '연결이 끊겼습니다.'
          }
          icon={iconArr[playerInfo ? playerInfo.number : 1]}
          socket={socket}
          title={`Game No. ${gameInfo?.gameId}`}
          timer={gameInfo?.timer}
          stage={gameInfo?.stage}
          round={gameInfo?.round}
          onSettingsClick={() => setIsSettingsOpen(true)}
          // onLeaveRoom={handleLeaveRoom}
        />
        <div className='lg:pl-[19.5rem]'>
          <div className='max-w-3xl mx-auto xl:max-w-none xl:ml-0 xl:mr-[32rem]'>
            <div className='chat-container flex flex-col h-screen overflow-auto'>
              {/* 메시지 리스트 영역 */}
              <div className='flex-1 px-5 pt-4'>
                {messages.map((msg: IMessage, index) => {
                  if (msg.player === 0) {
                    return <SystemBubble key={index} message={msg} />
                  } else {
                    return (
                      <ChatBubble
                        key={index}
                        message={msg}
                        playerName={`익명${msg.player}`}
                        iconArr={iconArr}
                      />
                    )
                  }
                })}
                <div
                  ref={scrollRef}
                  className='chat-input-temp h-[4.5rem] w-full'
                />
                <div className='chat-input fixed h-10 bottom-4 w-[calc(90rem-21rem-33.5rem-2rem)]'>
                  <ChatForm
                    isDead={playerInfo ? playerInfo.died : true}
                    socket={socket}
                    onSendChat={handleGameChat}
                    isVote={gameInfo?.stage === 'vote'}
                    isSubjectDebate={gameInfo?.stage === 'subject_debate'}
                    isFreeDebate={gameInfo?.stage === 'free_debate'}
                  />
                </div>
              </div>
              <RightGameSideBar
                messages={messages}
                players={gameInfo?.players}
                iconArr={iconArr}
                onVoteSubmit={handleVoteSubmit}
                stage={gameInfo?.stage}
              />
            </div>
          </div>
        </div>
      </div>
      {isSettingsOpen && (
        <Settings
          title='설정'
          first={false}
          setFirst={() => {}}
          onClose={() => setIsSettingsOpen(false)}
          isSettingsOpen={isSettingsOpen}
        />
      )}
    </div>
  )
}

export default GamePlay
