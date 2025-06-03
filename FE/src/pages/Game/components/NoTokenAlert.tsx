import { useNavigate } from 'react-router-dom'

const NoTokenAlert = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className='bg-[#dddddd] w-full h-full fixed'>
      <div className='text-center border max-w-[400px] mt-[50px] mx-auto p-5 rounded-lg border-solid bg-[#0000008f] border-[#F74A5C]/60 text-[#ececec]'>
        <h2>로그인을 해주세요!</h2>
        <p>게임 서비스를 이용하려면 로그인이 필요합니다.</p>
        <button
          onClick={handleGoHome}
          className='mt-4 px-[8px] py-1 border rounded-sm hover:border-[#F74A5C]/60 hover:text-[#F74A5C]'
        >
          홈으로 이동
        </button>
      </div>
    </div>
  )
}

export default NoTokenAlert
