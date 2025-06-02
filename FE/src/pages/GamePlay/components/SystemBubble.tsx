import type { IMessage } from '../../../types/gameroom'

interface SystemBubbleProps {
  message: IMessage
}

const SystemBubble = ({ message }: SystemBubbleProps) => {
  return (
    <div className='flex mb-4 justify-center'>
      <div
        className={`w-full my-2 py-3 px-4 text-sm font-semibold bg-[rgb(9,9,11)] text-red-500 border-2 border-solid border-[#555555] rounded-md`}
      >
        {message.text}
      </div>
    </div>
  )
}

export default SystemBubble
