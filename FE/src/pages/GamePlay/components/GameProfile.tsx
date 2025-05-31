import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faRobot,
  faNoteSticky,
  faCheckToSlot,
} from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { userMemoState } from "../../../store/gamePlayState";
// import { isUserDiedState, userMemoState } from "../../../store/gamePlayState";
import { useCallback, useState } from "react";
import MemoModal from "./MemoModal";

interface IGameProfileProps {
  nickname: string;
  playerNum: number;
  icon: string;
  isDied: boolean;
  stage?: string;
  onVoteSubmit: (target: number) => void;
}

function GameProfile({
  nickname,
  icon,
  playerNum,
  stage,
  // isDied,
  onVoteSubmit,
}: IGameProfileProps) {
  const robot: IconDefinition = faRobot;
  const noteSticky: IconDefinition = faNoteSticky;
  const checkToSlot: IconDefinition = faCheckToSlot;

  // const [isUserDead, setIsUserDead] = useRecoilState<boolean>(isUserDiedState);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userMemos, setUserMemos] = useRecoilState(userMemoState);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSuspiciousChange = useCallback(
    (userIndex: number) => {
      setUserMemos((prev) => {
        const newState = [...prev];
        newState[userIndex] = {
          ...newState[userIndex],
          suspicious: !newState[userIndex].suspicious, // 현재 값을 반전
        };
        return newState;
      });
    },
    [setUserMemos]
  );

  return (
    <div
      className={`${
        stage === "vote" ? "profile-container" : "normal-profile-container"
      } shadow-[0px_0px_16px_rgba(255,255,255,0.25)] border-2 border-solid border-[rgba(255,255,255,0.35)] w-full h-full`}
    >
      {/* 6개의 선(line) */}
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
      <div className="flex justify-center items-center px-4 py-2">
        <img
          className="filter brightness-75 w-3/4 h-3/4 rounded-sm"
          src={icon}
        />
      </div>
      <div
        className={`${
          userMemos[playerNum - 1].suspicious
            ? "text-red-700"
            : "text-[#cccccc]"
        } flex w-full text-base font-bold justify-center mb-1`}
      >
        {nickname}
      </div>
      <div className="flex w-full justify-center">
        <button
          onClick={() => {
            handleSuspiciousChange(playerNum - 1);
          }}
        >
          <FontAwesomeIcon
            icon={robot}
            className={`${
              userMemos[playerNum - 1].suspicious
                ? "text-red-700 hover:text-red-600"
                : "text-[#cccccc] hover:text-white"
            }  p-1 w-[1.25rem] h-[1.25rem] mx-1`}
          />
        </button>
        {stage === "vote" ? (
        // {stage === "vote" && isUserDead === false ? (
          <button
            onClick={() => {
              onVoteSubmit(playerNum);
            }}
          >
            <FontAwesomeIcon
              icon={checkToSlot}
              className="text-[#cccccc] hover:text-white p-1 w-[1.5rem] h-[1.5rem] mx-1"
            />
          </button>
        ) : (
          <></>
        )}
        <button onClick={handleOpenModal}>
          <FontAwesomeIcon
            icon={noteSticky}
            className="text-[#cccccc] hover:text-white p-1 w-[1.25rem] h-[1.25rem] mx-1"
          />
        </button>
        <MemoModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          playerNum={playerNum}
        />
      </div>
    </div>
  );
}

export default GameProfile;
