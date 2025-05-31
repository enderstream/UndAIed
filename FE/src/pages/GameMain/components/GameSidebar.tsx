import { Link } from "react-router-dom";
import DonutChart from "../components/DonutChart";
import { useUserProfile } from "../../../hooks/useUserData";
import { getPlayerIcon } from "../../../util/PlayerIcon";
import { useClickSound } from "../../../hooks/useClickSound";
import slideSound from "../../../assets/bgm/slide.mp3";
import AudioPlayer from "../../../util/AudioPlayer";
// import { memo } from "react";

function GameSidebar() {
  const blockStyle =
    "border border-[#f74a5c]/60 backdrop-blur-[12.20px] text-[#fffbfb] rounded-[5px] transition-all duration-200";
  const blockHover =
    "hover:bg-[#f8376467] hover:border-[#f93c4f] hover:shadow-[0_0_15px_0] hover:shadow-[#F74A5C]";
  const blockActive =
    "active:bg-[#f837644e] active:border-[#f837644e] active:shadow-sm";

  const clickSound = useClickSound();
  const { data: response, isLoading, error } = useUserProfile();
  const userData = response?.data;
  // userData가 존재할 때만 승률 계산
  const winningRate = userData
    ? userData.totalWin + userData.totalLose > 0
      ? Math.round(
          (userData.totalWin / (userData.totalLose + userData.totalWin)) * 10000
        ) / 100
      : 0
    : 0;

  return (
    <>
      <AudioPlayer src={slideSound} isPlaying={true} shouldLoop={false} />
      <aside
        className={`mx-8 w-80 h-full min-h-[730px] ${blockStyle} flex-col items-center bg-[#00000040] hidden md:flex`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            로딩중 입니다.
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div>프로필 로드 실패</div>
            <div className="text-sm text-red-400">다시 시도해주세요</div>
          </div>
        ) : userData ? (
          <>
            <div className="flex align-middle">
              <div className="w-32 h-32 mt-8 mb-3 flex items-center justify-center border border-[#f74a5c]/60">
                <img src={`${getPlayerIcon(userData.profileImage)}`} alt="" />
              </div>
              <div className="w-32 mt-5 flex flex-col gap-2 items-center justify-center text-[#fcfafa]">
                <div>{userData.nickname}</div>
                <div>총 판수 : {userData.totalWin + userData.totalLose}</div>
              </div>
            </div>

            <div className="mt-62 flex flex-col items-center">
              <div className="mt-10 mb-7 text-2xl">
                <DonutChart percent={winningRate} />
              </div>
              <div className="mb-7">
                승률 | {userData.totalWin} 승 | {userData.totalLose} 패 |{" "}
                {winningRate}%
              </div>
            </div>

            <div className="mt-auto w-full flex flex-col items-center mb-8">
              <Link to="/gamemypage">
                <button
                  onMouseDown={clickSound}
                  className={`${blockStyle} ${blockHover} ${blockActive} w-72 h-10 mt-4 bg-[#281919]`}
                >
                  내 정보
                </button>
              </Link>
            </div>
          </>
        ) : null}
      </aside>
    </>
  );
}

export default GameSidebar;
