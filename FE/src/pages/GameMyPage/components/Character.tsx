import CharacterImage1 from '../../../assets/character/character1.png'
import CharacterImage2 from '../../../assets/character/character2.png'
import CharacterImage3 from '../../../assets/character/character3.png'
import { useClickSound } from '../../../hooks/useClickSound'
import { useUpdateProfile, useUserProfile } from '../../../hooks/useUserData'
import { useState } from 'react'

const Character = () => {
  const blockStyle =
    'bg-[#0000006c] border border-[#f74a5c]/40 backdrop-blur-[12.20px] text-[#fffbfb] rounded-[5px] transition-all duration-200'
  const blockHover =
    'hover:bg-[#f8376467] hover:border-[#f93c4f] hover:shadow-[0_0_15px_0] hover:shadow-[#F74A5C]'
  const blockActive =
    'active:bg-[#f837644e] active:border-[#f837644e] active:shadow-sm'

  const clickSound = useClickSound()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isRotating, setIsRotating] = useState(false)

  const getCharacterImage = (avatar: number) => {
    switch (avatar) {
      case 1:
        return CharacterImage1
      case 2:
        return CharacterImage2
      case 3:
        return CharacterImage3
      default:
        return CharacterImage1 // 기본 이미지
    }
  }
  const characters = [
    { id: 1, name: 'Character 1', image: CharacterImage1 },
    { id: 2, name: 'Character 2', image: CharacterImage2 },
    { id: 3, name: 'Character 3', image: CharacterImage3 },
  ]
  const ArrowIcon = ({ direction }: { direction: 'left' | 'right' }) => (
    <svg
      width='48'
      height='48'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={direction === 'right' ? 'rotate-180' : ''}
    >
      <polyline points='15 18 9 12 15 6' />
    </svg>
  )
  const rotateLeft = () => {
    if (isRotating) return
    setIsRotating(true)
    setSelectedIndex(prev => (prev === 0 ? characters.length - 1 : prev - 1))
    setTimeout(() => setIsRotating(false), 500)
  }
  const rotateRight = () => {
    if (isRotating) return
    setIsRotating(true)
    setSelectedIndex(prev => (prev === characters.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsRotating(false), 500)
  }
  const getCharacterStyles = (index: number) => {
    const positions = {
      left: {
        transform: 'translate(-90%, -70%) scale(0.8)',
        opacity: '0.5',
        filter: 'brightness(0.5)',
        zIndex: 10,
      },
      center: {
        transform: 'translate(-50%, -50%) scale(1)',
        opacity: '1',
        filter: 'brightness(1)',
        zIndex: 20,
      },
      right: {
        transform: 'translate(-10%, -70%) scale(0.8)',
        opacity: '0.5',
        filter: 'brightness(0.5)',
        zIndex: 10,
      },
    }

    const diff = (index - selectedIndex + characters.length) % characters.length
    if (diff === 0) return positions.center
    if (diff === 1 || diff === -(characters.length - 1)) return positions.right
    return positions.left
  }

  const { data: response, isLoading, error } = useUserProfile()
  const avatar = response?.data.avatar

  const updateProfileMutation = useUpdateProfile()

  const updateData = {
    sex: null,
    profileImage: null,
    avatar: selectedIndex + 1,
    age: null,
    nickname: null,
  }

  const handleSave = () => {
    updateProfileMutation.mutate(updateData)
  }

  if (isLoading) return <div>로딩중</div>
  if (error) return <div>에러났어요</div>

  return (
    <>
      <div className='flex justify-center'>
        <div className='z-10 w-160 items-center flex-col  hidden md:flex '>
          <div className='w-160'>
            {' '}
            <img
              className='mb-6'
              src={getCharacterImage(avatar)}
              alt={`Character ${avatar}`}
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            onMouseDown={clickSound}
            className={`${blockStyle} ${blockHover} ${blockActive} px-10 py-3 `}
          >
            캐릭터 선택
          </button>
        </div>
      </div>
      {/* Character Selection Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          {/* Modal Backdrop */}
          <div
            className='absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300'
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content */}
          <div className='relative w-full max-w-6xl h-[600px] flex items-center justify-center'>
            {/* Characters Container */}
            <div className='relative w-full h-full flex items-center justify-center'>
              {characters.map((character, index) => (
                <div
                  key={character.id}
                  className='absolute top-1/2 left-1/2 w-[725px] h-[700px] transition-all duration-500 ease-in-out'
                  style={{
                    ...getCharacterStyles(index),
                    transformOrigin: 'center center',
                  }}
                >
                  <div
                    className='w-full h-full   border-[#f74a5c]/40 backdrop-blur-sm 
                                rounded-lg overflow-hidden'
                  >
                    <img
                      src={character.image}
                      alt={character.name}
                      className='w-full h-full object cover-'
                    />
                    {index === selectedIndex && (
                      <div className='absolute bottom-0 w-full py-4 px-6 bg-black/60 backdrop-blur-sm'>
                        <h3 className='text-[#fffbfb] text-xl font-medium text-center'>
                          {character.name}
                        </h3>
                      </div>
                    )}
                  </div>

                  {index === selectedIndex && (
                    <div
                      className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-1 
                                  bg-[#f74a5c] rounded-full shadow-lg shadow-[#f74a5c]/50'
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={rotateLeft}
              className='absolute left-16 text-white/80 hover:text-white transition-colors z-30'
              disabled={isRotating}
            >
              <ArrowIcon direction='left' />
            </button>
            <button
              onClick={rotateRight}
              className='absolute right-16 text-white/80 hover:text-white transition-colors z-30'
              disabled={isRotating}
            >
              <ArrowIcon direction='right' />
            </button>

            {/* Selection Button */}
          </div>
          <button
            onClick={() => {
              // 캐릭터 선택 로직
              handleSave()
              setIsModalOpen(false)
            }}
            className={`absolute bottom-14 px-8 py-3 z-30
                ${blockStyle} ${blockHover} ${blockActive}`}
          >
            선택 확인
          </button>
        </div>
      )}
    </>
  )
}

export default Character
