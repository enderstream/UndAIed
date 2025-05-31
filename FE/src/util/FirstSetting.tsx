// import AudioPlayer from "./AudioPlayer";
// import Setting from "./Setting";
// import firstBgm from "../assets/bgm/my-page.mp3";
// // import { atom, RecoilState, useRecoilState } from "recoil";
// import { useState } from "react";

// function FirstSetting() {
//   const [isFirst, setIsFirst] = useState(true);
//   return (
//     <>
//       {isFirst && (
//         <AudioPlayer src={firstBgm} isPlaying={true} shouldLoop={false} />
//       )}
//       <div>
//         <Setting
//           title="원하는 설정을 선택해주세요"
//           first={isFirst}
//           setFirst={setIsFirst}
//         />
//         <button className="border border-white">확인</button>
//       </div>
//     </>
//   );
// }

// export default FirstSetting;



import { useState } from "react";
import AudioPlayer from "./AudioPlayer";
import Setting from "./Setting";
import firstBgm from "../assets/bgm/my-page.mp3";

function FirstSetting() {
  const [isFirst, setIsFirst] = useState(true);

  return (
    <>
      {isFirst && (
        <AudioPlayer src={firstBgm} isPlaying={true} shouldLoop={false} />
      )}
      <div>
        <Setting
          title="원하는 설정을 선택해주세요"
          first={isFirst}
          setFirst={setIsFirst}
          isSettingsOpen={isFirst}
          onClose={() => setIsFirst(false)}
        />
        <button
          className="border border-white"
          onClick={() => setIsFirst(false)}
        >
          확인
        </button>
      </div>
    </>
  );
}

export default FirstSetting;
