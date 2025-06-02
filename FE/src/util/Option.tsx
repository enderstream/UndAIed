import type { ChangeEvent } from 'react'
import React, { useState } from 'react'

interface SoundSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  initialVolume?: number
  onVolumeChange?: (volume: number) => void
}

const SoundSettingsModal: React.FC<SoundSettingsModalProps> = ({
  isOpen,
  onClose,
  initialVolume = 50,
  onVolumeChange,
}) => {
  const [volume, setVolume] = useState<number>(initialVolume)

  if (!isOpen) return null

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value)
    setVolume(newVolume)
    onVolumeChange?.(newVolume)
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      <div
        className='w-80 p-6 bg-slate-800/80 border border-red-500/60 rounded-lg backdrop-blur-md text-white 
                    hover:border-red-400 transition-all duration-200 
                    shadow-lg hover:shadow-red-500/30'
      >
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-semibold'>Sound Settings</h2>
          <button
            onClick={onClose}
            className='px-2 rounded hover:bg-red-500/20 active:bg-red-500/30 transition-colors'
            type='button'
            aria-label='Close settings'
          >
            ✕
          </button>
        </div>

        <div className='space-y-4'>
          <div className='flex items-center gap-3'>
            <span className='text-sm'>Master Volume</span>
            <span className='ml-auto text-sm'>{volume}%</span>
          </div>

          <input
            type='range'
            min='0'
            max='100'
            value={volume}
            onChange={handleVolumeChange}
            className='w-full h-2 bg-slate-600 rounded-full appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-4
                     [&::-webkit-slider-thumb]:h-4
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-red-500
                     [&::-webkit-slider-thumb]:hover:bg-red-400
                     [&::-webkit-slider-thumb]:transition-colors'
          />
        </div>

        <div className='mt-6 flex justify-end'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-slate-700/80 hover:bg-red-500/30 active:bg-red-500/40 
                     border border-red-500/60 rounded-md transition-all duration-200
                     hover:border-red-400'
            type='button'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default SoundSettingsModal
