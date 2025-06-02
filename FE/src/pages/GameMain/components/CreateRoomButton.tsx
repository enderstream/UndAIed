import { useState } from 'react'
import { atom, useRecoilState } from 'recoil'
import { useSocket } from '../../../hooks/useSocket'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { useClickSound } from '../../../hooks/useClickSound'

// Recoil atoms
export const createRoomModalState = atom<boolean>({
  key: 'createRoomModalState',
  default: false,
})

// Types
interface CreateRoomForm {
  roomTitle: string
  isPrivate: boolean
  roomPassword: string
}

interface CreateResponse {
  success: boolean
  errorMessage: string
  data: number
}

const CreateRoomButton = () => {
  const socket = useSocket()
  const clickSound = useClickSound()
  const [isOpen, setIsOpen] = useRecoilState(createRoomModalState)
  const [roomInfo, setRoomInfo] = useState<CreateRoomForm>({
    roomTitle: '',
    isPrivate: false,
    roomPassword: '',
  })

  const navigate = useNavigate()
  const handleSubmit = (e: React.FormEvent) => {
    if (!socket) {
      return
    }
    e.preventDefault()
    socket.emit('lobby:room:create', roomInfo, (response: CreateResponse) => {
      if (response.success) {
        //에러 발생 처리

        if (roomInfo.isPrivate) {
          navigate(`room/${response.data}?pwd=${roomInfo.roomPassword}`)
        } else {
          navigate(`room/${response.data}`)
        }
      } else {
        toast.error(response.errorMessage)
      }
    })
    setIsOpen(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setRoomInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        onMouseDown={clickSound}
        className='z-10 w-32 justify-start px-6 py-2 bg-black border-2 border-[#bf8f5b] text-white rounded hover:bg-[#211b05] hover:border-[#dea569] hover:shadow-[0_0_10px_0] hover:shadow-[#f99f3e] active:border-[#906639] active:bg-black active:shadow-none duration-100 '
      >
        방 만들기
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div className='fixed inset-0 z-50'>
          {/* Blur Overlay */}
          <div
            className='absolute inset-0 bg-black/50 backdrop-blur-sm'
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md'>
            <div className='bg-gray-950 border border-[#8a6845] rounded-lg shadow-xl py-6 px-8'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl text-white font-semibold'>방 제목</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className='text-gray-400 hover:text-white'
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className='space-y-4'>
                <input
                  type='text'
                  name='roomTitle'
                  value={roomInfo.roomTitle}
                  onChange={handleChange}
                  placeholder='방 제목을 입력하세요'
                  className='w-full px-3 py-2 bg-[#2e2e2ef0] border border-gray-800 rounded text-white focus:outline-none focus:border-[#EAAF74]'
                  required
                />

                <div className='flex items-center space-x-2'>
                  <label htmlFor='isPrivate' className='text-white'>
                    비밀방
                  </label>
                  <input
                    type='checkbox'
                    name='isPrivate'
                    id='isPrivate'
                    checked={roomInfo.isPrivate}
                    onChange={handleChange}
                    className='w-4 h-4 accent-[#ffd941]'
                  />
                </div>

                {roomInfo.isPrivate && (
                  <input
                    type='password'
                    name='roomPassword'
                    value={roomInfo.roomPassword}
                    onChange={handleChange}
                    placeholder='비밀번호를 입력하세요'
                    className='w-full px-3 py-2 bg-[#2e2e2ef0] border border-gray-800 rounded text-white focus:outline-none focus:border-[#EAAF74]'
                    required
                  />
                )}

                <div className='flex justify-end space-x-2 mt-6'>
                  <button
                    type='button'
                    onClick={() => setIsOpen(false)}
                    className='px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors'
                  >
                    취소
                  </button>
                  <button
                    type='submit'
                    className='px-4 py-2 bg-[#ffaf02] text-white rounded hover:bg-[#ffc653] active:bg-[#ffb413d3] transition-colors'
                  >
                    방 생성
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreateRoomButton
