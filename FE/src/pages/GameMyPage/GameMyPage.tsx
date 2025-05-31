import GameHeader from "../GameMain/components/GameHeader";
import gameMyPageBackground from "../../assets/game-my-page/game-my-page-background.png";
import GameUserInfo from "./components/GameUserInfo";
import Character from "./components/Character";
import GamePlayList from "./components/GamePlayList";
// import { useRecoilValue } from "recoil";
// import { settingsState } from "../../store/settingState";
import "../GameMain/components/style.css";
import AudioPlayer from "../../util/AudioPlayer";
import slideSound from "../../assets/bgm/slide.mp3";
import myPageBgm from "../../assets/bgm/my-page.mp3";

function GameMyPage() {
  // const settingData = useRecoilValue(settingsState);
  // const isFullscreen = settingData.isFullscreen;

  return (
    <div className="bg-black flex flex-col items-center h-screen min-h-[900px]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat min-h-[900px]"
        style={{ backgroundImage: `url(${gameMyPageBackground})` }}
      />
      <div className="absolute bg-[#00000063] min-h-[900px] inset-0 bg-gradient-to-r from-black via-transparent to-black z-0" />
      <AudioPlayer src={slideSound} isPlaying={true} shouldLoop={false} />
      <AudioPlayer src={myPageBgm} isPlaying={true} shouldLoop={true} />

      <div className="flex-none w-full z-10">
        <GameHeader />
      </div>
      <div className="flex-1 grid grid-cols-1 max-w-[1440px] content-center md:grid-cols-3 gap-4 md:gap-8">
        <div className="slide-in-left">
          <GameUserInfo />
        </div>
        <div className="slide-in-center">
          <Character />
        </div>
        <div className="slide-in-right ">
          <GamePlayList />
        </div>
      </div>
    </div>
  );
}

export default GameMyPage;
