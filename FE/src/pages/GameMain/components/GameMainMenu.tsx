// import { useRecoilValue } from "recoil";
// import Setting from "../../../util/Setting";
// import { settingsState } from "../../../store/settingState";

// function GameMainMenu() {
//   const footerButtonStyle =
//     "bg-black px-3 py-1 border-t-2  hover:bg-[#4e1b26]   border-[#682d39]  hover:border-[#f93c4f] duration-300 active:border-[#531d1d] active:bg-[#3f1010]";
//   const settingData = useRecoilValue(settingsState);
//   const isFullScreen = settingData.isFullscreen;

//   return (
//     <>
//       <div className="flex justify-end">
//         {/* <button className={`${footerButtonStyle}  rounded-tl-sm border-l-2`}>
//           <img src={bellIcon} alt="notifications" className="w-7" />
//         </button> */}

//         {isFullScreen ? (
//           <div className={`${footerButtonStyle} border-2`}>
//             <Setting
//               title="게임 설정"
//               first={false}
//               setFirst={() => {}}
//             ></Setting>
//           </div>
//         ) : (
//           <div className={`${footerButtonStyle} border-l-2`}>
//             <Setting
//               title="게임 설정"
//               first={false}
//               setFirst={() => {}}
//             ></Setting>
//           </div>
//         )}

//         {/* <button className={`${footerButtonStyle}`}>
//           <img src={friendsIcon} alt="friends" className="h-7" />
//         </button> */}
//       </div>
//     </>
//   );
// }

// export default GameMainMenu;




import { useRecoilValue } from "recoil";
import { useState } from "react";
import Setting from "../../../util/Setting";
import { settingsState } from "../../../store/settingState";

function GameMainMenu() {
  const footerButtonStyle =
    "bg-black px-3 py-1 border-t-2 hover:bg-[#4e1b26] border-[#682d39] hover:border-[#f93c4f] duration-300 active:border-[#531d1d] active:bg-[#3f1010]";
  const settingData = useRecoilValue(settingsState);
  const isFullScreen = settingData.isFullscreen;
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="flex justify-end">
      {isFullScreen ? (
        <div className={`${footerButtonStyle} border-2`}>
          <Setting
            title="게임 설정"
            first={false}
            setFirst={() => {}}
            isSettingsOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
          />
        </div>
      ) : (
        <div className={`${footerButtonStyle} border-l-2`}>
          <Setting
            title="게임 설정"
            first={false}
            setFirst={() => {}}
            isSettingsOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
          />
        </div>
      )}
    </div>
  );
}

export default GameMainMenu;
