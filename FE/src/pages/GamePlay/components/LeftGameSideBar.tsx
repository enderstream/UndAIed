import { useState } from "react";
import {
  // faBell,
  faGear,
  // faUserGroup,
  faDoorOpen,
  faCircleExclamation,
  faBars,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Socket } from "socket.io-client";
import SecondCounter from "./SecondCounter";
import { STAGE_INFO } from "./info";
import { useNavigate } from "react-router";

interface ILeftGameSideBarProps {
  nickname: string;
  icon: string;
  title: string;
  timer?: number;
  stage?: keyof typeof STAGE_INFO;
  round?: number;
  socket: Socket | null;
  // onLeaveRoom: () => void;
  onSettingsClick: () => void;
}

//아이콘
// const bell: IconDefinition = faBell;
const gear: IconDefinition = faGear;
// const userGroup: IconDefinition = faUserGroup;
const circleExclamation: IconDefinition = faCircleExclamation;
const doorOpen: IconDefinition = faDoorOpen;
const menu: IconDefinition = faBars;
const leftChervon: IconDefinition = faChevronLeft;

function LeftGameSideBar({
  nickname,
  icon,
  title,
  timer,
  stage,
  round,
  // socket,
  onSettingsClick,
}: // onLeaveRoom,
ILeftGameSideBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <button
        className={`fixed block translate-y-0 lg:-translate-y-[120%] z-30 text-white px-1 py-2 bg-gray-800 rounded-b-lg
          transform transition-all duration-300
          ${isOpen ? "close-left-sidebar" : ""}
     `}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? (
          <FontAwesomeIcon
            className="text-white p-1 w-[1rem] h-[1rem]"
            icon={leftChervon}
          />
        ) : (
          <FontAwesomeIcon
            icon={menu}
            className="text-white p-1 w-[1rem] h-[1rem]"
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
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="w-full flex flex-col items-center text-[white] bg-[rgb(7,7,10)] px-1.5 py-1 border-2 border-solid border-[rgba(255,255,255,0.35)] rounded-md">
          <div className="text-sm">{title}</div>
          <h1 className="text-base font-medium">{round}라운드</h1>
          <div className="flex items-center text-lg ">
            <h2 className="mr-3 text-xl font-semibold mb-[0.375rem]">
              {stage ? STAGE_INFO[stage][0] : "Disconnected"}
            </h2>
            <SecondCounter
              initialSeconds={timer ? timer : 0}
              maxSeconds={stage ? STAGE_INFO[stage][1] : 0}
              stage={stage ? STAGE_INFO[stage][0] : "Disconnected"}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center profile w-52 h-52 border-2 border-solid border-[rgba(255,255,255,0.35)] bg-[#07070a4d]">
          <img
            className="filter brightness-75 w-28 h-28 mb-3 rounded-sm"
            src={icon}
          />
          <span className="text-base font-bold justify-center text-[#cccccc] mb-1">
            {nickname}
          </span>
        </div>

        <div className="w-full">
          <div className="config-container w-[3rem] h-[9rem] bg-[#ff3939]/10 rounded-xl flex flex-col justify-between py-4">
            {/* <button>
                      <FontAwesomeIcon
                        icon={bell}
                        className="text-white p-1 w-[1.25rem] h-[1.25rem]"
                      />
                    </button> */}
            <button onClick={onSettingsClick}>
              <FontAwesomeIcon
                icon={gear}
                className="text-white p-1 w-[1.25rem] h-[1.25rem]"
              />
            </button>
            {/* <button onClick={copyCurrentURL}>
                      <FontAwesomeIcon
                        icon={userGroup}
                        className="text-white p-1 w-[1.25rem] h-[1.25rem]"
                      />
                    </button> */}
            <button
              onClick={(event) => {
                event.preventDefault();
                window.open(
                  "/board/bugreport",
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
            >
              <FontAwesomeIcon
                icon={circleExclamation}
                className="text-white p-1 w-[1.25rem] h-[1.25rem]"
              />
            </button>
            <button
              onClick={() => {
                navigate("/game");
              }}
            >
              <FontAwesomeIcon
                icon={doorOpen}
                className="text-white p-1 w-[1.25rem] h-[1.25rem]"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeftGameSideBar;
