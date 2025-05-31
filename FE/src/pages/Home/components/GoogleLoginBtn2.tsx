import React, { useEffect } from "react";

interface GoogleLoginButtonProps {
  onTokenReceive: (token: string) => void;
}

const GoogleLoginButton2: React.FC<GoogleLoginButtonProps> = ({
  onTokenReceive,
}) => {
  // Google 로그인 성공 시 호출되는 콜백
  const handleCallbackResponse = (
    response: google.accounts.id.CredentialResponse
  ) => {
    // 구글에서 발급해준 JWT
    const token = response.credential;

    // 부모 컴포넌트나 상위 로직으로 토큰 전달
    onTokenReceive(token);
  };

  useEffect(() => {
    // window 전역에서 google 객체에 접근
    /* global google */
    if (
      typeof google !== "undefined" &&
      google.accounts &&
      google.accounts.id
    ) {
      google.accounts.id.initialize({
        client_id:
          "704642215458-2og18pmpedr8rc1n1rc2443b86mspdgt.apps.googleusercontent.com", // 환경 변수에서 가져오기
        callback: handleCallbackResponse,
      });

      // 실제 구글 로그인 버튼을 렌더링 (id="googleSignInDiv"인 DOM에)
      google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv") as HTMLElement,
        {
          theme: "outline", // or 'filled_blue'
          size: "large", // or 'medium', 'small'
          shape: "pill", // or 'rectangular', 'circle'
          text: "continue_with", // 'signin_with', 'signup_with'
          width: "360px",
        }
      );
    }
  }, []);

  return <div id="googleSignInDiv" />;
};

export default GoogleLoginButton2;
