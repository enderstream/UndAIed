import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCrown } from "@fortawesome/free-solid-svg-icons";

interface IReadyProfileProps {
  isHost: boolean;
  nickname: string;
  icon: string;
  playerNum: number;
}

function ReadyProfile({
  nickname,
  icon,
  // playerNum,
  isHost,
}: IReadyProfileProps) {
  const crown: IconDefinition = faCrown;

  return (
    <div className="shadow-[0px_0px_16px_rgba(255,255,255,0.25)] border-2 border-solid border-[rgba(255,255,255,0.35)] w-full h-full hover:border-[rgba(255,0,0,0.5)] hover:shadow-[0px_0px_16px_rgba(255,0,0,0.45)]">
      {/* <div className="hover:shadow-[0px_0px_16px_rgba(255,0,0,0.45)] w-full h-full hover:animate-ping text-white"></div> */}
      <div className="flex justify-center items-center px-4 py-1">
        <img className="filter brightness-75 w-3/4 h-3/4" src={icon} />
      </div>
      <div className="flex w-full text-base font-bold justify-center text-[#cccccc] mb-1">
        {nickname}
      </div>

      <div className="flex w-full justify-center">
        {isHost ? (
          <FontAwesomeIcon className="text-[#ffc07e]/70" icon={crown} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ReadyProfile;
