import { useEffect, useRef, useState } from "react";
import ReadyProfile from "./ReadyProfile";
import EmptyProfile from "./EmptyProfile";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IMessage, IPlayer } from "../../../types/gameroom";
// import SystemBubble from "../../GamePlay/components/SystemBubble";
import { getPlayerIcon } from "../../../util/PlayerIcon";

interface RightSideBarProps {
  /** 현재 게임 방의 유저 목록 */
  players?: IPlayer[];
  /** 플레이어 아이콘 배열 */
  messages: IMessage[];
}
const peopleGroup: IconDefinition = faPeopleGroup;

/**
 * props로 전달받은 `players` 배열에서
 * playerNum(1~6)에 해당하는 유저를 찾아서
 * ReadyProfile / EmptyProfile을 렌더링
 */
function RightSideBar({ players, messages }: RightSideBarProps) {
  const [isRightOpen, setIsRightOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollSystemBottom = () => {
    scrollRef.current?.scrollIntoView({ block: "end" });
  };
  useEffect(() => {
    // 새로운 메시지가 추가될 때 스크롤을 아래로 이동
    scrollSystemBottom();
  }, [messages]);

  return (
    <>
      <div
        className={`fixed translate-y-full z-20 right-[max(0px,calc(50%-45rem))] w-[33.5rem] py-6 px-3 h-screen bg-black bg-opacity-40
                  border-solid border-l-2 border-l-[rgba(255,255,255,0.35)]
                  shadow-[0px_0px_16px_rgba(255,255,255,0.25)]
                  transition-transform duration-300 ease-in-out
                  xl:translate-y-0 grid grid-cols-3 grid-rows-4 gap-4
                ${isRightOpen ? "translate-y-full" : "close-right-sidebar"}`}
      >
        {/* 플레이어 프로필 영역 */}
        {players ? (
          <>
            <div className="row-start-1 px-2 py-1">
              {players[0] ? (
                <ReadyProfile
                  isHost={players[0].isHost}
                  nickname={players[0].nickname}
                  playerNum={players[0].enterId}
                  icon={getPlayerIcon(players[0].profileImage)}
                />
              ) : (
                <EmptyProfile />
              )}
            </div>
            <div className="row-start-1 px-2 py-1">
              {players[1] ? (
                <ReadyProfile
                  isHost={players[1].isHost}
                  nickname={players[1].nickname}
                  playerNum={players[1].enterId}
                  icon={getPlayerIcon(players[1].profileImage)}
                />
              ) : (
                <EmptyProfile />
              )}
            </div>
            <div className="row-start-1 px-2 py-1">
              {players[2] ? (
                <ReadyProfile
                  isHost={players[2].isHost}
                  nickname={players[2].nickname}
                  playerNum={players[2].enterId}
                  icon={getPlayerIcon(players[2].profileImage)}
                />
              ) : (
                <EmptyProfile />
              )}
            </div>
            <div className="row-start-2 px-2 py-1">
              {players[3] ? (
                <ReadyProfile
                  isHost={players[3].isHost}
                  nickname={players[3].nickname}
                  playerNum={players[3].enterId}
                  icon={getPlayerIcon(players[3].profileImage)}
                />
              ) : (
                <EmptyProfile />
              )}
            </div>
            <div className="row-start-2 px-2 py-1">
              {players[4] ? (
                <ReadyProfile
                  isHost={players[4].isHost}
                  nickname={players[4].nickname}
                  playerNum={players[4].enterId}
                  icon={getPlayerIcon(players[4].profileImage)}
                />
              ) : (
                <EmptyProfile />
              )}
            </div>
            <div className="row-start-2 px-2 py-1">
              {players[5] ? (
                <ReadyProfile
                  isHost={players[5].isHost}
                  nickname={players[5].nickname}
                  playerNum={players[5].enterId}
                  icon={getPlayerIcon(players[5].profileImage)}
                />
              ) : (
                <EmptyProfile />
              )}
            </div>
          </>
        ) : (
          <div className="text-lg text-white">Loading...</div>
        )}

        <div className="w-full text-base flex flex-col justify-between items-center row-start-3 row-end-5 col-span-3 text-white px-2 py-1">
          <div className="w-full text-base flex justify-end items-center text-white px-2 py-1">
            {players?.length}/6
          </div>
          <div className="w-full h-[80%] text-base flex flex-col bg-[rgb(7,7,10)] border-2 border-solid border-[#B4B4B4] text-white px-2 py-1">
            <div className="w-full flex justify-center mb-2 text-lg font-semibold">
              시스템 로그
            </div>
            <div className="chat-container overflow-auto flex flex-col w-full">
              {messages.map((msg: IMessage, index) => {
                if (msg.player === -1) {
                  return (
                    <div className="text-sm mb-1" key={index}>
                      {msg.text}
                    </div>
                  );
                }
              })}
              <div ref={scrollRef} className="h-[0.5rem] w-full"></div>
            </div>
          </div>
        </div>
      </div>

      <button
        className="fixed z-30 top-2 right-4 text-white p-3 rounded-md bg-gray-800 xl:translate-x-[150%]"
        onClick={() => setIsRightOpen((prev) => !prev)}
      >
        <FontAwesomeIcon
          icon={peopleGroup}
          className="text-white w-[1.25rem] h-[1.25rem]"
        />
      </button>
    </>
  );
}

export default RightSideBar;
