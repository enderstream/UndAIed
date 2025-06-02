// import { useRecoilValue } from "recoil";
// import { userState } from "../../store/userState";

const Friends = () => {
  // const userInfo = useRecoilValue(userState);

  return (
    <>
      <h1>GameLobby 페이지</h1>
      <div />
      <div className='flex justify-center items-center fixed w-screen h-screen'>
        <div className='w-88 h-32 bg-[#181717] absolute flex flex-col border-2 border-solid border-[#5B2E35] py-5 px-[30px]'>
          <h1 className='text-white mb-2'>친구 추가</h1>
          <div className='border border-white/20 h-0 w-full mb-6' />
          <form>
            <input
              className='h-6 w-52 border text-sm px-2.5 py-1.5 rounded-[5px] border-solid border-[rgba(255,255,255,0.5) bg-black text-sm text-[#B4B4B4]'
              type='text'
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default Friends
