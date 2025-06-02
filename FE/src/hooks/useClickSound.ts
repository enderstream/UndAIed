import { useEffect, useRef } from 'react'
import click from '../assets/bgm/click.mp3'
import { settingsState } from '../store/settingState'
import { useRecoilValue } from 'recoil'

export function useClickSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const settings = useRecoilValue(settingsState)
  useEffect(() => {
    // 컴포넌트가 마운트될 때 Audio 객체 생성
    audioRef.current = new Audio(click)
  }, [])

  const playSound = () => {
    if (settings.isMuted) {
      return
    }

    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error('Error playing sound:', error)
      })
    }
  }

  return playSound
}
