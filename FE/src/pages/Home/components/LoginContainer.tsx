import { useNavigate } from "react-router-dom";
import { IUser } from "../../../types/User";
import { userState } from "../../../store/userState";
import { useRecoilState, useSetRecoilState } from "recoil";
import IntroOverlay from "../../../util/IntroOverlay";
import { useState } from "react";
import Policy from "../../../pages/Policy";
import FirstSetting from "../../../util/FirstSetting";
import { setShowIntroState } from "../../../store/showState";
import { getPlayerIcon } from "../../../util/PlayerIcon";

interface ILoginContainer {
  userInfo: IUser;
}

function LoginContainer({ userInfo }: ILoginContainer) {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const [showIntro, setShowIntro] = useRecoilState(setShowIntroState);
  const [showPolicy, setShowPolicy] = useState(false);
  const [showSetting, setShowSetting] = useState(false);

  const checkUserPolicy = () => {
    const userPersistData = localStorage.getItem("userPersist");
    if (userPersistData) {
      const userData = JSON.parse(userPersistData);
      const userId = userData.userState.email; // 현재 로그인된 사용자의 ID

      const policyData = localStorage.getItem(`policy`);
      if (policyData) {
        const policyEmailData = JSON.parse(policyData);
        const policyEmail = policyEmailData.userEmail;
        if (policyEmail === userId && policyEmailData.agreed) {
          return true;
        } else {
          return false;
        }
      }

      return policyData ? JSON.parse(policyData).agreed : false;
    }
    return false;
  };

  // 게임 시작 버튼 클릭 핸들러
  const handleGameStart = () => {
    const policyAgreed = checkUserPolicy();

    if (!policyAgreed) {
      setShowPolicy(true);
    } else {
      setShowIntro(true);
    }
  };

  // Policy 동의 처리
  const handlePolicyAccept = () => {
    const userPersistData = localStorage.getItem("userPersist");
    if (userPersistData) {
      const userData = JSON.parse(userPersistData);
      const userId = userData.userState.email;

      localStorage.setItem(
        `policy`,
        JSON.stringify({
          userEmail: userId,
          agreed: true,
          timestamp: new Date().toISOString(),
        }),
      );
    }

    setShowPolicy(false);
    setShowSetting(true);
  };

  // Policy 거부 처리
  const handlePolicyDecline = () => {
    const userPersistData = localStorage.getItem("userPersist");
    if (userPersistData) {
      const userData = JSON.parse(userPersistData);
      const userId = userData.userState.email;

      localStorage.setItem(
        `policy`,
        JSON.stringify({
          userEmail: userId,
          agreed: false,
          timestamp: new Date().toISOString(),
        }),
      );
    }

    setShowPolicy(false);
  };

  // 로그아웃 처리
  const handleLogout = () => {
    setUser({
      isLogin: false,
      token: "",
      email: "",
      nickname: "",
      totalWin: 0,
      totalLose: 0,
      profileImage: 0,
    });
    navigate("/");
  };

  return (
    <>
      <style>
        {`
        @import url(https://fonts.googleapis.com/css?family=Abril+Fatface|Roboto:400,400italic,500,500italic);
        
        .game-button {
          position: relative;
          width: 22.5rem;
          height: 7rem;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: black;
          color: rgba(255,255,255,0.95);
          font-family: sans-serif;
          font-size: 1.875rem;
          font-weight: normal;
          cursor: pointer;
          text-shadow: 1px 1px rgba(246, 0, 153,0.8),
                      -1px -1px rgba(15, 210, 255,0.8),
                      -1px 0px rgba(255, 210, 0, 1);
          transition: text-shadow 0.3s ease;
        }

        @-webkit-keyframes wiggle {
          0% { -webkit-transform: skewX(24deg); } 
          10% { -webkit-transform: skewX(-8deg); }
          20% { -webkit-transform: skewX(55deg); }
          30% { -webkit-transform: skewX(-90deg); }
          40% { -webkit-transform: skewX(29deg); }
          50% { -webkit-transform: skewX(-90deg); }
          60% { -webkit-transform: skewX(3deg); }
          70% { -webkit-transform: skewX(-2deg); }
          80% { -webkit-transform: skewX(1deg); }
          90% { -webkit-transform: skewX(10deg); }
          100% { -webkit-transform: skewX(0deg); }
        }

        .game-button:hover {
          -webkit-animation: wiggle 0.2s 4;
          text-shadow: 15px 13px rgba(246, 0, 153,0.8),
                      -18px -4px rgba(15, 210, 255,0.8);
        }
      `}
      </style>

      <div className="flex flex-col w-full items-center">
        {showIntro && <IntroOverlay />}
        {showSetting && <FirstSetting />}
        {showPolicy && (
          <Policy
            onAccept={handlePolicyAccept}
            onDecline={handlePolicyDecline}
          />
        )}
        <div className="overflow-hidden border mb-8 bg-black">
          <button onClick={handleGameStart} className="game-button">
            GAME START
          </button>
        </div>
        <div className="w-[22.5rem] h-[10rem] flex justify-center items-center bg-black text-white border-2 border-[#822424] rounded-sm">
          <div className="w-24 h-24 flex justify-center items-center mr-5">
            <img
              className="w-28 h-28"
              src={getPlayerIcon(userInfo.profileImage)}
              alt=""
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between text-lg pb-0.5">
              <div className="font-semibold">{userInfo.nickname}님</div>
              <button
                className="text-[11px] h-6 ml-3 border-[1px] rounded-sm px-2 hover:bg-[#4e4e4e60] transition-colors flex items-center justify-center"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </div>
            <h2 className="text-sm">{userInfo.email}</h2>
            <div className="text-xs flex items-center space-x-2">
              <span className="text-red-400">승률</span>
              <div className="flex items-center space-x-1">
                <span>{userInfo.totalWin}승</span>
                <span>|</span>
                <span>{userInfo.totalLose}패</span>
                <span>|</span>
                <span>
                  {userInfo.totalWin + userInfo.totalLose === 0
                    ? "0"
                    : (
                        (userInfo.totalWin /
                          (userInfo.totalWin + userInfo.totalLose)) *
                        100
                      ).toFixed(1)}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginContainer;
