import { createPortal } from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const ProfileEditModal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null

  return createPortal(
    <div className='fixed inset-0 z-9999'>
      <div
        className='fixed inset-0 bg-black/50 backdrop-blur-sm'
        onClick={onClose}
      />
      <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md'>
        {children}
      </div>
    </div>,
    document.body
  )
}
