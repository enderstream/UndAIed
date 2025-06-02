import React from 'react'
import { useRecoilState } from 'recoil'
import { userMemoState } from '../../../store/gamePlayState'

interface MemoModalProps {
  isOpen: boolean
  onClose: () => void
  playerNum: number
}

const MemoModal = ({ isOpen, onClose, playerNum }: MemoModalProps) => {
  const [userMemos, setUserMemos] = useRecoilState(userMemoState)

  if (!isOpen) return null

  // 바깥쪽 오버레이를 클릭하면 모달 닫힘
  const handleOverlayClick = () => {
    onClose()
  }

  // 모달 안쪽을 클릭했을 때 이벤트 전파 방지
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  const handleMemoChange = (userIndex: number, value: string) => {
    setUserMemos(prev => {
      const newState = [...prev]
      newState[userIndex] = {
        ...newState[userIndex],
        memo: value,
      }
      return newState
    })
  }

  return (
    <div
      className='fixed z-50 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center opacity-100'
      onClick={handleOverlayClick}
    >
      <div
        className='bg-black w-96 p-4 rounded shadow text-white opacity-100'
        onClick={handleModalClick}
      >
        <h2 className='text-xl font-bold mb-2'>추리</h2>
        <textarea
          className='w-full h-32 p-2 border bg-gray-950 border-gray-600 rounded focus:border-gray-500 focus:outline-none'
          value={userMemos[playerNum - 1].memo}
          onChange={e => {
            handleMemoChange(playerNum - 1, e.target.value)
          }}
        />
        <div className='flex justify-end mt-4'>
          <button
            className='bg-red-700 text-white px-4 py-1 rounded'
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}

export default MemoModal
