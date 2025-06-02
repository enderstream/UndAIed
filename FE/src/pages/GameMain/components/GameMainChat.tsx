import type { FormEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useSocket } from '../../../hooks/useSocket'

interface ChatMessage {
  nickname: string
  message: string
}

const GameMainChat = () => {
  const socket = useSocket()
  const blockStyle =
    'bg-[#0000006c] border border-[#f74a5c]/40 backdrop-blur-[12.20px] text-[#fffbfb] rounded-[5px] transition-all duration-200'
  const [chatList, setChatList] = useState<ChatMessage[]>([])
  const [chat, setChat] = useState('')
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true)

  // const checkScrollBottom = () => {
  //   if (chatContainerRef.current) {
  //     const { scrollTop, scrollHeight, clientHeight } =
  //       chatContainerRef.current;
  //     const isBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 10;
  //     setIsScrolledToBottom(isBottom);
  //   }
  // };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    if (!socket) return

    socket.on('lobby:chat', (message: ChatMessage) => {
      setChatList(prev => [...prev, message])
      if (isScrolledToBottom) {
        setTimeout(scrollToBottom, 0)
      }
    })

    return () => {
      socket.off('lobby:chat')
    }
  }, [socket, isScrolledToBottom])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (chat.trim() === '') return
    const message = chat
    setChat('') // 입력창 초기화

    socket?.emit('lobby:chat', message)
    setTimeout(scrollToBottom, 0)
    setIsScrolledToBottom(true)
  }
  ;<style>
    {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 3px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #f74a5c;
            border-radius: 3px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #ff6b7d;
          }
        `}
   </style>
  return (
    <div className={`flex flex-col p-4 bg-[#0000008f] h-52   ${blockStyle} `}>
      <div
        ref={chatContainerRef}
        className='custom-scrollbar mb-3 flex-1 min-h-[8rem] max-h-[12rem] overflow-y-auto'
      >
        {chatList.map((msg, index) => (
          <div key={index} className='mb-1'>
            <span className='font-bold mr-3'>{msg.nickname} </span>
            <span>{msg.message}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          value={chat}
          onChange={e => setChat(e.target.value)}
          placeholder='채팅 입력'
          type='text'
          className={`p-4 h-8 w-full bg-[#241818de] ${blockStyle} transition-colors duration-50 focus:border-2 focus:border-[#ff6767] focus:outline-none focus:bg-[#1122338e]`}
        />
      </form>
    </div>
  )
}

export default GameMainChat
