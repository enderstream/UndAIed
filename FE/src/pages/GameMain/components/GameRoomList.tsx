import { useEffect, useRef } from 'react'
import GameRoomCard from './GameRoomCard'
import { Link } from 'react-router-dom'
import { useGameRooms } from '../../../hooks/useGameRoomList'

const GameRoomList = () => {
  const { rooms, loading, hasMore, fetchMoreRooms } = useGameRooms()
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMoreRooms()
        }
      },
      { threshold: 0.7 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [hasMore, fetchMoreRooms])

  return (
    <>
      <style>
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
      <div className='z-10 flex-1 flex flex-col px-7 py-4 bg-[#0000008f] rounded-[5px] border border-[#f74a5c]/60'>
        <div className='grid md:grid-cols-[6rem,1fr,8rem] grid-cols-[4rem,1fr,5rem] px-2 text-white mb-4'>
          <span>No.</span>
          <span>Title</span>
          <span className='text-right'>인원수</span>
        </div>

        <div className='h-[23.2rem] overflow-hidden'>
          <ul className='custom-scrollbar h-full overflow-y-auto space-y-2.5 pr-2'>
            {rooms.map(room => (
              <Link key={room.roomId} to={`room/${room.roomId}`}>
                <GameRoomCard room={room} />
              </Link>
            ))}
            <div
              ref={observerTarget}
              className='h-10 flex items-center justify-center'
            >
              {loading && <p className='text-white'>로딩중...</p>}
              {!hasMore && <p className='text-white'>더 이상 방이 없습니다.</p>}
            </div>
          </ul>
        </div>
      </div>
    </>
  )
}

export default GameRoomList
