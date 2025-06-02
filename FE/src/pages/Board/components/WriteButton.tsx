import { Link } from 'react-router-dom'
import { toast } from 'sonner'

const WriteButton = () => {
  const userData = localStorage.getItem('userPersist')

  const writeClick = () => {
    if (!userData) {
      toast('로그인후 글쓰기가 가능합니다.')
    }
  }

  return (
    <div className='text-right mt-5'>
      {userData ? (
        <Link to='/write'>
          <button className='w-30 h-30 border-2 px-11 py-3 bg-black text-white hover:bg-[#484848f7] border-black right-0'>
            글쓰기
          </button>
        </Link>
      ) : (
        <button
          onClick={writeClick}
          className='w-30 h-30 border-2 px-11 py-3 bg-black text-white hover:bg-[#484848f7] border-black right-0'
        >
          글쓰기
        </button>
      )}
    </div>
  )
}

export default WriteButton
