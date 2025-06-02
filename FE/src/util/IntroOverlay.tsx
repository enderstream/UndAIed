// components/IntroOverlay.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import intro from '../assets/intro.gif'
import './style/IntroOverlay.css'
import AudioPlayer from '../util/AudioPlayer'
import introBgm from '../assets/bgm/intro.mp3'

const IntroOverlay = () => {
  const [showPrompt, setShowPrompt] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // GIF fade-in 시작
    setTimeout(() => {
      setVisible(true)
    }, 10)

    // 1초 후에 프롬프트 표시
    const promptTimer = setTimeout(() => {
      setShowPrompt(true)
    }, 2000)

    const handleInteraction = () => {
      if (showPrompt && !fadeOut) {
        setFadeOut(true)
        setTimeout(() => {
          navigate('/game')
        }, 500)
      }
    }

    window.addEventListener('keydown', handleInteraction)
    window.addEventListener('click', handleInteraction)

    return () => {
      clearTimeout(promptTimer)
      window.removeEventListener('keydown', handleInteraction)
      window.removeEventListener('click', handleInteraction)
    }
  }, [showPrompt, navigate, fadeOut])

  return (
    <>
      <AudioPlayer src={introBgm} isPlaying={true} shouldLoop={false} />
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black'>
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black'>
          <div className='relative'>
            <img
              src={intro}
              alt='Game Intro'
              className={`max-w-full max-h-full object-contain transition-opacity duration-1000 ease-in-out
            ${visible ? 'opacity-100' : 'opacity-0'}
            ${fadeOut ? 'opacity-0' : ''}`}
            />
            {showPrompt && (
              <div className='absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full text-center'>
                <p className='text-white text-xl font-bold blink-text'>
                  아무 키나 입력해 주세요
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default IntroOverlay
