import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMaximize,
  faMinimize,
  faVolumeHigh,
  faVolumeXmark,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import setting from '../assets/icon/setting.png'
// import { setShowIntroState } from "../store/showState";
import type { SettingProps } from '../types/setting'
import { settingsState } from '../store/settingState'

const blockStyle =
  'bg-[#0000006c] border border-[#f74a5c]/40 backdrop-blur-[12.20px] text-[#fffbfb] rounded-[5px] transition-all duration-200'
const blockHover =
  'hover: hover:border-[#f93c4f] hover:shadow-[0_0_15px_0] hover:shadow-[#F74A5C]'
const blockActive =
  'active:bg-[#f837644e] active:border-[#f837644e] active:shadow-sm'

// 설정 아이콘 컴포넌트
const SettingIcon = () => {
  return <img src={setting} alt='settings' className='w-7' />
}

const Settings = ({
  title,
  first,
  setFirst,
  onClose,
  isSettingsOpen,
}: SettingProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useRecoilState(settingsState)
  // const [showIntro, setShowIntro] = useRecoilState(setShowIntroState);

  const applySettingsToMedia = () => {
    document.querySelectorAll('video, audio').forEach(element => {
      if (element instanceof HTMLMediaElement) {
        element.volume = settings.volume
        element.muted = settings.isMuted
      }
    })
  }

  useEffect(() => {
    applySettingsToMedia()
  }, [])

  useEffect(() => {
    applySettingsToMedia()
  }, [settings.volume, settings.isMuted])

  useEffect(() => {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node instanceof HTMLMediaElement) {
            node.volume = settings.volume
            node.muted = settings.isMuted
          }
        })
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [settings.volume, settings.isMuted])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setSettings(prev => ({
        ...prev,
        isFullscreen: !!document.fullscreenElement,
      }))
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (error) {
      console.error('Fullscreen error:', error)
    }
  }

  const toggleMute = () => {
    setSettings(prev => {
      const newMuted = !prev.isMuted
      return { ...prev, isMuted: newMuted }
    })
  }

  const setVolume = (volume: number) => {
    const normalizedVolume = Math.max(0, Math.min(1, volume))
    setSettings(prev => ({
      ...prev,
      volume: normalizedVolume,
    }))
  }

  const handleAccept = () => {
    setIsOpen(false)
    // setShowIntro(true);
    setFirst(false)
  }
  return (
    <>
      {/* 설정 아이콘만 반환 */}
      {!first && !isSettingsOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className='flex justify-center items-center'
        >
          <SettingIcon />
        </button>
      )}

      {/* 모달 */}

      {(isOpen || first || isSettingsOpen) && (
        <>
          {first && (
            <div className='fixed inset-0 bg-black z-50 flex items-center justify-center' />
          )}
          <div className='overflow-hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'>
            <div className={`${blockStyle} ${blockHover} relative`}>
              {!first && (
                <button
                  onClick={() => {
                    setIsOpen(false)
                    onClose()
                  }}
                  className='absolute top-2 right-2 p-2 rounded-full hover:bg-[#ffffff1a] transition-colors'
                  aria-label='Close settings'
                >
                  <FontAwesomeIcon icon={faXmark} className='w-4 h-4' />
                </button>
              )}
              <div className='p-6 space-y-6'>
                <h2 className='text-xl font-semibold mb-4'>{title}</h2>

                <div className='space-y-4'>
                  <button
                    onClick={toggleFullscreen}
                    className='flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-[#ffffff1a] transition-colors w-full'
                    aria-label={settings.isFullscreen ? '창모드' : '전체화면'}
                  >
                    <FontAwesomeIcon
                      icon={settings.isFullscreen ? faMinimize : faMaximize}
                      className='w-5 h-5'
                    />
                    <span>{settings.isFullscreen ? '창모드' : '전체화면'}</span>
                  </button>

                  <button
                    onClick={toggleMute}
                    className='flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-[#ffffff1a] transition-colors w-full'
                    aria-label={settings.isMuted ? '음소거 해제' : '음소거'}
                  >
                    <FontAwesomeIcon
                      icon={settings.isMuted ? faVolumeXmark : faVolumeHigh}
                      className='w-5 h-5'
                    />
                    <span>{settings.isMuted ? '음소거 해제' : '음소거'}</span>
                  </button>

                  <div className='flex items-center gap-4 px-3 py-2'>
                    <span className='text-sm'>음량 조절</span>
                    <input
                      type='range'
                      min='0'
                      max='1'
                      step='0.01'
                      value={settings.volume}
                      onChange={e => setVolume(parseFloat(e.target.value))}
                      className='flex-1 accent-[#f74a5c]'
                      aria-label='Volume control'
                    />
                  </div>
                </div>
              </div>
              {first && (
                <div className='flex justify-around'>
                  <button
                    className={`${blockStyle} ${blockActive} ${blockHover} py-2 px-4 mb-5`}
                    onClick={handleAccept}
                  >
                    확인
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Settings
