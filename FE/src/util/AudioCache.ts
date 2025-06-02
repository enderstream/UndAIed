const audioCache = new Map<string, HTMLAudioElement>()

export const preloadAudio = (src: string): HTMLAudioElement => {
  if (audioCache.has(src)) {
    return audioCache.get(src)!
  }

  const audio = new Audio(src)
  audio.preload = 'auto'
  audio.load()
  audioCache.set(src, audio)
  return audio
}
