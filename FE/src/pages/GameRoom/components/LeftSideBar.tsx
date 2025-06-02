import { useState } from 'react'
import {
  // faBell,
  faGear,
  // faUserGroup,
  faDoorOpen,
  faCircleExclamation,
  faBars,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { Socket } from 'socket.io-client'
import type { IPlayer } from '../../../types/gameroom'
// import { toast } from "sonner";

interface ILeftSideBarProps {
  roomId?: number
  roomTitle?: string
  nickname: string
  icon: string
  socket: Socket | null
  onLeaveRoom: () => void
  onGameStart: () => void
  player?: IPlayer
  onSettingsClick: () => void
}

//아이콘
// const bell: IconDefinition = faBell;
const gear: IconDefinition = faGear
// const userGroup: IconDefinition = faUserGroup;
const circleExclamation: IconDefinition = faCircleExclamation
const doorOpen: IconDefinition = faDoorOpen
const menu: IconDefinition = faBars
const leftChervon: IconDefinition = faChevronLeft

const LeftSideBar = ({
  roomId,
  roomTitle,
  nickname,
  icon,
  // socket,
  onLeaveRoom,
  onGameStart,
  player,
  onSettingsClick,
}: ILeftSideBarProps) => {
  const [isOpen, setIsOpen] = useState(false)

  // const copyCurrentURL = () => {
  //   const url = window.location.href;
  //   navigator.clipboard
  //     .writeText(url)
  //     .then(() => {
  //       toast.success("URL이 복사되었습니다!");
  //     })
  //     .catch((err) => {
  //       toast.error("URL 복사 실패: ", err);
  //     });
  // };

  return (
    <>
      <button
        className={`fixed block translate-y-0 lg:-translate-y-[120%] z-30 text-white px-1 py-2 bg-gray-800 rounded-b-lg
          transform transition-all duration-300
          ${isOpen ? 'close-left-sidebar' : ''}
     `}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {isOpen ? (
          <FontAwesomeIcon
            className='text-white p-1 w-[1rem] h-[1rem]'
            icon={leftChervon}
          />
        ) : (
          <FontAwesomeIcon
            icon={menu}
            className='text-white p-1 w-[1rem] h-[1rem]'
          />
        )}
      </button>
      <div
        className={`
          fixed -translate-x-full lg:translate-x-0 z-20 inset-0 
          left-[max(0px,calc(50%-45rem))] right-auto
          w-[21rem] pb-10 pt-6 pl-6 pr-4 
          bg-black bg-opacity-70 
          shadow-[0px_0px_16px_rgba(255,255,255,0.25)] 
          border-r-2 border-solid border-r-[rgba(255,255,255,0.35)] 
          flex flex-col justify-between items-center
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className='w-full text-base flex justify-center items-center text-[white] bg-[rgb(7,7,10)] px-1.5 py-1 border-2 border-solid border-[rgba(255,255,255,0.35)] rounded-md'>
          No. {roomId} {roomTitle}
        </div>
        <div className='flex flex-col items-center justify-center profile w-52 h-52 border-2 border-solid border-[rgba(255,255,255,0.35)] bg-[#07070a4d]'>
          <img className='filter brightness-75 w-28 h-28 mb-3' src={icon} />
          <span className='text-base font-bold justify-center text-[#cccccc] mb-1'>
            {nickname}
          </span>
        </div>
        {player?.isHost ? (
          <button
            onClick={onGameStart}
            className='w-52 h-14 bg-gradient-to-r from-black via-black to-black rounded-[5px] backdrop-blur-[12.20px] justify-center items-center inline-flex mb-6'
          >
            <div className='w-52 h-14 relative'>
              <div className='w-52 h-14 left-0 top-0 absolute opacity-90 bg-black/50 rounded-[5px] shadow-[inset_0px_0px_17px_4px_rgba(255,222,32,0.25)] border-2 border-[#ffc07e]/70' />
              <div className="w-52 h-14 left-0 top-0 absolute flex justify-center items-center text-white text-xl font-normal font-['Inder']">
                게임 시작
              </div>
            </div>
          </button>
        ) : (
          <div className='w-52 h-14 bg-gradient-to-r from-black via-black to-black rounded-[5px] backdrop-blur-[12.20px] justify-center items-center inline-flex mb-6'>
            <div className='w-52 h-14 relative'>
              <div className='w-52 h-14 left-0 top-0 absolute opacity-90 bg-black/50 rounded-[5px] shadow-[inset_0px_0px_17px_4px_rgba(255,222,32,0.25)] border-2 border-[gray]/70' />
              <div className="w-52 h-14 left-0 top-0 absolute flex justify-center items-center text-white text-xl font-normal font-['Inder']">
                준 비
              </div>
            </div>
          </div>
        )}

        <div className='w-full'>
          <div className='config-container w-[3rem] h-[9rem] bg-[#ff3939]/10 rounded-xl flex flex-col justify-between py-4'>
            {/* <button>
              <FontAwesomeIcon
                icon={bell}
                className="text-white p-1 w-[1.25rem] h-[1.25rem]"
              />
            </button> */}
            <button onClick={onSettingsClick}>
              <FontAwesomeIcon
                icon={gear}
                className='text-white p-1 w-[1.25rem] h-[1.25rem]'
              />
            </button>
            {/* <button onClick={copyCurrentURL}>
              <FontAwesomeIcon
                icon={userGroup}
                className="text-white p-1 w-[1.25rem] h-[1.25rem]"
              />
            </button> */}
            <button
              onClick={event => {
                event.preventDefault()
                window.open('/board/bugreport', '_blank', 'noopener,noreferrer')
              }}
            >
              <FontAwesomeIcon
                icon={circleExclamation}
                className='text-white p-1 w-[1.25rem] h-[1.25rem]'
              />
            </button>
            <button onClick={onLeaveRoom}>
              <FontAwesomeIcon
                icon={doorOpen}
                className='text-white p-1 w-[1.25rem] h-[1.25rem]'
              />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LeftSideBar
