import { useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { preloadAudio } from './AudioCache'
import { settingsState } from '../store/settingState'

interface AudioPlayerProps {
  src: string
  isPlaying: boolean
  shouldLoop?: boolean
}

const AudioPlayer = ({
  src,
  isPlaying,
  shouldLoop = true,
}: AudioPlayerProps) => {
  const settings = useRecoilValue(settingsState)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // 컴포넌트 마운트시 즉시 오디오 초기화
  useEffect(() => {
    const audio = preloadAudio(src)
    audio.loop = shouldLoop
    audio.volume = settings.volume
    audio.muted = settings.isMuted
    audio.currentTime = 0
    audioRef.current = audio

    if (isPlaying && !settings.isMuted) {
      audio.play().catch(error => {
        console.error('오디오 재생 실패:', error)
      })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        // 캐시는 유지하되 현재 컴포넌트의 참조는 제거
        audioRef.current = null
      }
    }
  }, [src, shouldLoop])

  // 재생 상태 변경시
  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying && !settings.isMuted) {
      audioRef.current.play().catch(error => {
        console.error('오디오 재생 실패:', error)
      })
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, settings.isMuted])

  // 볼륨 및 음소거 설정 변경시
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = settings.volume
      audioRef.current.muted = settings.isMuted
    }
  }, [settings.volume, settings.isMuted])

  return null
}

export default AudioPlayer
