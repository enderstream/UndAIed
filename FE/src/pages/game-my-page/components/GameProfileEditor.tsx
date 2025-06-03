// GameProfileEditor.tsx
import { useState } from 'react'
import { ProfileEditModal } from './ProfileEditModal'
import type { GameUserInfoProps } from '../../../types/user'

// 8개의 아바타 이미지 import
import { useUpdateProfile } from '../../../hooks/useUserData'
import { PlayerIcons } from '../../../util/PlayerIcon'

interface GameProfileEditorProps {
  isOpen: boolean
  onClose: () => void
  userInfo: GameUserInfoProps['userInfo']
}

export const GameProfileEditor = ({
  isOpen,
  onClose,
  userInfo,
}: GameProfileEditorProps) => {
  const blockStyle =
    'bg-[#0000006c] border border-[#F74A5C]/40 backdrop-blur-[12.20px] text-[#fffbfb] rounded-[5px] transition-all duration-200'
  const blockHover =
    'hover:bg-[#f8376467] hover:border-[#f93c4f] hover:shadow-[0_0_15px_0] hover:shadow-[#F74A5C]'
  const blockActive =
    'active:bg-[#f837644e] active:border-[#f837644e] active:shadow-sm'
  const [nickname, setNickname] = useState(userInfo.nickname)
  const [selectedProfileImage, setSelectedProfileImage] = useState(1) // 기본값 1

  const updateProfileMutation = useUpdateProfile()

  const handleSave = () => {
    updateProfileMutation.mutate(updateData)
    onClose()
  }

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    // 12자 제한
    if (newValue.length <= 12) {
      setNickname(newValue)
    }
  }
  const updateData = {
    sex: null,
    profileImage: selectedProfileImage,
    avatar: null,
    age: null,
    nickname,
  }

  return (
    <ProfileEditModal isOpen={isOpen} onClose={onClose}>
      <div className={`${blockStyle} py-6 px-8`}>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold'>프로필 수정</h2>
          <button onClick={onClose} className='text-gray-400 hover:text-white'>
            ✕
          </button>
        </div>

        <div className='space-y-4'>
          <div>
            <label className='block text-sm mb-1.5'>닉네임 수정</label>
            <input
              type='text'
              value={nickname}
              onChange={handleNicknameChange}
              className='w-full px-3 py-2 bg-[#2e2e2ef0] border border-[#F74A5C]/40 rounded text-white focus:outline-none focus:border-[#F74A5C]'
              placeholder='닉네임을 입력하세요'
            />
          </div>

          <div>
            <label className='block text-sm mb-2'>플레이어 아이콘 선택</label>
            <div className='grid grid-cols-4 gap-2'>
              {PlayerIcons.map(avatar => (
                <div
                  key={avatar.id}
                  onClick={() => setSelectedProfileImage(avatar.id)}
                  className={`
                    ${blockStyle}
                    ${
                      selectedProfileImage === avatar.id
                        ? 'border-[#F74A5C] shadow-[0_0_15px_0] shadow-[#F74A5C]'
                        : ''
                    }
                    p-2 cursor-pointer transition-all duration-200 hover:border-[#F74A5C]
                  `}
                >
                  <img
                    src={avatar.src}
                    alt={`Avatar ${avatar.id}`}
                    className='w-full h-auto'
                  />
                </div>
              ))}
            </div>
          </div>

          <div className='flex justify-end gap-2 mt-6'>
            <button
              onClick={onClose}
              className={`${blockStyle} ${blockHover} hover:shadow-none ${blockActive} px-4 py-2`}
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className={`${blockStyle} ${blockHover} ${blockActive} bg-[#f4393996] hover:bg-[#f12e2ec6] active: px-4 py-2`}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </ProfileEditModal>
  )
}

export default GameProfileEditor
