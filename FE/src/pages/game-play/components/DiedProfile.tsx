import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faRobot, faNoteSticky } from '@fortawesome/free-solid-svg-icons'
import MemoModal from './MemoModal'
import { useCallback, useState } from 'react'
import { useRecoilState } from 'recoil'
import { userMemoState } from '../../../store/gamePlayState'

interface IDiedProfileProps {
  nickname: string
  icon: string
  playerNum: number
}

const DiedProfile = ({ nickname, icon, playerNum }: IDiedProfileProps) => {
  const robot: IconDefinition = faRobot
  const noteSticky: IconDefinition = faNoteSticky

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userMemos, setUserMemos] = useRecoilState(userMemoState)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSuspiciousChange = useCallback(
    (userIndex: number) => {
      setUserMemos(prev => {
        const newState = [...prev]
        newState[userIndex] = {
          ...newState[userIndex],
          suspicious: !newState[userIndex].suspicious, // 현재 값을 반전
        }
        return newState
      })
    },
    [setUserMemos]
  )

  return (
    <div className='shadow-[0px_0px_16px_rgba(255,255,255,0.25)] border-2 border-solid border-[rgba(255,255,255,0.35)] w-full h-full'>
      {/* <div className="hover:shadow-[0px_0px_16px_rgba(255,0,0,0.45)] w-full h-full hover:animate-ping text-white"></div> */}
      <div className='flex justify-center items-center px-4 py-2'>
        <img
          className='filter opacity-70 grayscale sepia brightness-75 contrast-125 w-3/4 h-3/4 rounded-sm'
          src={icon}
        />
      </div>
      <div
        className={`${
          userMemos[playerNum - 1].suspicious
            ? 'text-red-700'
            : 'text-[#cccccc]'
        } flex opacity-70 w-full text-base font-bold justify-center text-[#cccccc] mb-1 line-through`}
      >
        {nickname}
      </div>
      <div className='flex w-full justify-center'>
        <button
          onClick={() => {
            handleSuspiciousChange(playerNum - 1)
          }}
        >
          <FontAwesomeIcon
            icon={robot}
            className={`${
              userMemos[playerNum - 1].suspicious
                ? 'text-red-700 hover:text-red-600'
                : 'text-[#cccccc] hover:text-white'
            }text-[#cccccc] hover:text-white p-1 w-5 h-5 mx-1`}
          />
        </button>
        <button onClick={handleOpenModal}>
          <FontAwesomeIcon
            icon={noteSticky}
            className='text-[#cccccc] hover:text-white p-1 w-5 h-5 mx-1'
          />
        </button>
        <MemoModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          playerNum={playerNum}
        />
      </div>
    </div>
  )
}

export default DiedProfile
