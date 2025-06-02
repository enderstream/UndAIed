import lobbyBgm from '../../assets/bgm/lobby.mp3'
import bgImg from '../../assets/game-rooms-background.png'
import './components/style.css'

import GameRoomList from './components/GameRoomList'
import GameHeader from './components/GameHeader'
import GameSidebar from './components/GameSidebar'
import GameMainChat from './components/GameMainChat'
// import GameMainMenu from "./components/GameMainMenu";
import CreateRoomButton from './components/CreateRoomButton'
import AudioPlayer from '../../util/AudioPlayer'
// import { useRecoilValue } from "recoil";
// import { settingsState } from "../../store/settingState";

const GameMain = () => {
  // const settingData = useRecoilValue(settingsState);
  // const isFullscreen = settingData.isFullscreen;
  return (
    <>
      <AudioPlayer src={lobbyBgm} isPlaying={true} shouldLoop={true} />
      <div className='w-screen h-screen bg-black select-none  '>
        <div
          className='w-full h-full  bg-cover bg-center bg-no-repeat fixed inset-0'
          style={{ backgroundImage: `url(${bgImg})` }}
        >
          <div className='absolute inset-0 bg-linear-to-r from-black to-[#11223349] opacity-100' />
        </div>

        <div className=' w-full h-full flex flex-col  '>
          <div className=' z-10 slide-in-top w-full  '>
            <GameHeader />
          </div>
          <div className='flex-1 md:flex md:m-12 md:mb-5 mb-5 items-center justify-center'>
            <div className='slide-in-left max-h-[1200px]'>
              <GameSidebar />
            </div>

            <div className='flex flex-col flex-1 px-8 max-w-[1000px]'>
              <div className='slide-in-top flex flex-col gap-4 md:mt-0 mt-5'>
                <CreateRoomButton />
                <GameRoomList />
              </div>

              <div className='slide-in-right mt-5'>
                <GameMainChat />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GameMain
