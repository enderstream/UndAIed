import axios from 'axios'
// import GoogleLoginButton from "./GoogleLoginBtn";
import { useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router'
import { userState } from '../../../store/userState'
import GoogleLoginButton2 from './GoogleLoginBtn2'
import { HashLink } from 'react-router-hash-link'

const LogoutContainer = () => {
  const setUser = useSetRecoilState(userState)
  const navigate = useNavigate()

  const handleTokenReceive = async (token: string) => {
    try {
      // 서버로 토큰 전송
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user`,
        { token }
      )
      // 서버 응답 확인

      // 응답이 성공인 경우
      if (response.data.isSuccess) {
        // 서버에서 내려준 유저 정보를 구조분해 할당
        const {
          token: serverToken,
          email,
          nickname,
          totalWin,
          totalLose,
          profileImage,
        } = response.data.data

        // Recoil userState에 사용자 정보 저장
        setUser({
          isLogin: true,
          token: serverToken,
          email,
          nickname,
          totalWin,
          totalLose,
          profileImage,
        })

        // 신규 회원가입(201)과 기존 회원 로그인(200) 분기 처리
        if (response.status === 201) {
          // 회원가입 직후, 성별/나이 등의 추가 정보 입력을 받아야 함
          // 라우팅 예시
          navigate('/signup')

          // 혹은 모달로 처리하는 예시
          // setShowSignUpModal(true);
        } else if (response.status === 200) {
          // 이미 회원가입된 사용자이므로 바로 메인 페이지 등으로 이동
          navigate('/')
        }
      }
    } catch (error: any) {
      console.error('서버 전송 에러:', error)

      // 에러 응답 상태별로 분기 처리 가능
      if (error.response) {
        if (error.response.status === 400) {
          // 클라이언트 데이터 누락
          alert('잘못된 요청입니다. 다시 시도해주세요.')
        } else if (error.response.status === 500) {
          // 서버 내부 에러
          alert('서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.')
        }
      }
    }
  }

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
      <div id='login' className='flex flex-col w-full items-center'>
        <HashLink to='/#login' smooth />
        <div className='overflow-hidden border mb-8 bg-black'>
          <button onClick={() => navigate('/game')} className='game-button'>
            GAME START
          </button>
        </div>
        <GoogleLoginButton2 onTokenReceive={handleTokenReceive} />
        {/* <GoogleLoginButton onTokenReceive={handleTokenReceive} /> */}
        {/* <button className="w-90 h-9 border border-[#dadce0] bg-white rounded-[20px] flex items-center justify-between px-3 mt-5">
        <div></div>
        <div className="text-[#3c4043] text-sm font-medium font-['Roboto']">
          가입하기
        </div>
        <div></div>
      </button> */}
      </div>
    </>
  )
}

export default LogoutContainer
