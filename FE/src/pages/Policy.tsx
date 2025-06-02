import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface ConsentProps {
  onAccept: () => void
  onDecline: () => void
}

const Policy: React.FC<ConsentProps> = ({ onAccept, onDecline }) => {
  const [isChecked, setIsChecked] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = () => {
    if (isChecked) {
      onAccept()
      navigate('/game', { replace: true })
    } else {
      if (
        window.confirm(
          '데이터 수집에 동의하지 않으시면 게임 플레이가 제한될 수 있습니다. 계속하시겠습니까?'
        )
      ) {
        onDecline()
      }
    }
  }

  return (
    <div className='fixed inset-0 bg-black flex items-center justify-center z-50'>
      <div className='bg-[#0000006c] border border-[#f74a5c] backdrop-blur-[12.20px] text-white rounded-lg p-6 max-w-2xl w-full mx-4'>
        <h2 className='text-xl font-bold mb-4'>연구 및 데이터 수집 동의서</h2>

        <div className='space-y-4 mb-6 border p-4 border-[#868585]'>
          <p className='text-lg font-semibold'>연구 목적</p>
          <p>
            본 게임은 인공지능(AI)과 인간의 상호작용 패턴을 연구하고, AI의
            자연스러운 대화 능력을 향상시키기 위한 데이터를 수집합니다.
          </p>

          <p className='text-lg font-semibold mt-4'>수집하는 데이터</p>
          <ul className='list-disc pl-5 space-y-2'>
            <li>게임 내 대화 내용</li>
            <li>AI 판별 근거 (플레이어가 입력한 AI 식별 이유)</li>
            <li>게임 진행 중 투표 패턴</li>
            <li>게임 결과</li>
          </ul>

          <p className='text-lg font-semibold mt-4'>데이터 활용 방법</p>
          <p>수집된 데이터는 다음과 같이 활용됩니다:</p>
          <ul className='list-disc pl-5 space-y-2'>
            <li>AI의 대화 패턴 개선</li>
            <li>인간과 AI의 상호작용 연구</li>
            <li>게임 시스템 개선</li>
          </ul>

          <p className='text-lg font-semibold mt-4'>개인정보 보호</p>
          <ul className='list-disc pl-5 space-y-2'>
            <li>개인을 식별할 수 있는 정보는 수집하지 않습니다.</li>
            <li>수집된 데이터는 연구 목적으로만 사용됩니다.</li>
          </ul>
        </div>

        <div className='flex items-center mb-6'>
          <input
            type='checkbox'
            id='consent'
            checked={isChecked}
            onChange={e => setIsChecked(e.target.checked)}
            className='mr-2'
          />
          <label htmlFor='consent'>
            위 내용을 이해했으며, 데이터 수집에 동의합니다.
          </label>
        </div>

        <div className='flex justify-center gap-4'>
          <button
            onClick={handleSubmit}
            className='px-6 py-2 bg-[#f74a5c] hover:bg-[#ff6b7d] active:bg-[#f837644e] rounded transition-colors duration-200'
          >
            동의 후 게임 시작
          </button>
        </div>
      </div>
    </div>
  )
}

export default Policy
