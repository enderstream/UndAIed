import React, { useEffect } from "react";
import GoogleIcon from "../../../assets/svg-icon/google_logo.svg";

interface GoogleLoginButtonProps {
  onTokenReceive: (token: string) => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onTokenReceive,
}) => {
  // 구글에서 로그인이 완료되었을 때 ID 토큰을 받아오는 콜백
  const handleCallbackResponse = (
    response: google.accounts.id.CredentialResponse
  ) => {
    const token = response.credential;
    onTokenReceive(token);
  };

  // useEffect(() => {
  //   // google.accounts.id.initialize 설정
  //   (window as any).google?.accounts.id.initialize({
  //     client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
  //     callback: handleCallbackResponse,
  //     auto_select: false, // 자동 One Tap을 비활성화하여 수동으로 호출
  //   });
  // }, []);

  useEffect(() => {
  // 디버깅 정보 추가
  // console.log('Current URL:', window.location.href);
  // console.log('Client ID:', process.env.REACT_APP_GOOGLE_CLIENT_ID);
  
  if (!(window as any).google) {
    console.error('Google script not loaded');
    return;
  }

  (window as any).google.accounts.id.initialize({
    client_id: "704642215458-2og18pmpedr8rc1n1rc2443b86mspdgt.apps.googleusercontent.com",
    callback: handleCallbackResponse,
    auto_select: false,
  });
}, []);

  // 버튼 클릭 시 로그인 과정을 트리거
  const handleLoginClick = () => {
    (window as any).google?.accounts.id.prompt();
    // prompt()가 호출되면, 구글 로그인 팝업(또는 One Tap)이 뜨고,
    // 로그인 성공 시 handleCallbackResponse가 실행됩니다.
  };

  return (
    <button
      onClick={handleLoginClick}
      className="w-[22.5rem] h-9 border border-[#dadce0] bg-white rounded-[20px] flex items-center justify-between px-3 mb-5"
    >
      <img src={GoogleIcon} alt="" />
      <div className="text-[#3c4043] text-sm font-medium font-['Roboto']">
        Google 계정으로 로그인
      </div>
      <div className="w-4 h-[1px]"></div>
    </button>
  );
};

export default GoogleLoginButton;
