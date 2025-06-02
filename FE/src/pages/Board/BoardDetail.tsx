import { Link, useParams, useNavigate } from 'react-router-dom'
import boardBanner from '../../assets/board/upscalingBoard.png'
import { jwtDecode } from 'jwt-decode'
import Banner from './components/Banner'
import Header from '../../components/Header'
import { useGetPost, useDeletePost } from '../../hooks/useBoard'

interface JWTPayload {
  roles: string
}

const BoardDetail = () => {
  const { number } = useParams<{ number: string }>()
  const navigate = useNavigate()
  const { data, isLoading, isError } = useGetPost(Number(number))
  const deletePostMutation = useDeletePost()

  // ADMIN 권한 확인
  const isAdmin = () => {
    try {
      const userData = localStorage.getItem('userPersist')
      if (!userData) return false

      const { userState } = JSON.parse(userData)
      const decoded = jwtDecode<JWTPayload>(userState.token)
      return decoded.roles === 'ROLE_ADMIN'
    } catch {
      return false
    }
  }

  const handleDelete = async () => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      try {
        await deletePostMutation.mutateAsync(Number(number), {
          onSuccess: () => {
            alert('게시글이 삭제되었습니다.')
            navigate('/board')
          },
          onError: error => {
            console.error('삭제 실패:', error)
            alert('게시글 삭제에 실패했습니다.')
          },
        })
      } catch (error) {
        console.error('Error:', error)
        alert('게시글 삭제 중 오류가 발생했습니다.')
      }
    }
  }

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return '-'

      const now = new Date()
      const diffInMilliseconds = now.getTime() - date.getTime()
      const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60))
      const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60))
      const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24))
      const diffInMonths = Math.floor(diffInDays / 30)
      const diffInYears = Math.floor(diffInDays / 365)

      if (diffInMinutes < 1) return '방금 전'
      if (diffInMinutes < 60) return `${diffInMinutes}분 전`
      if (diffInHours < 24) return `${diffInHours}시간 전`
      if (diffInDays < 30) return `${diffInDays}일 전`
      if (diffInMonths < 12) return `${diffInMonths}달 전`
      return `${diffInYears}년 전`
    } catch (error) {
      return '-'
    }
  }

  if (isLoading) {
    return <div>로딩중</div>
  }

  if (isError) {
    return <div>에러입니다</div>
  }

  if (!data?.data) {
    return <div>데이터가 없습니다???</div>
  }

  const post = data.data

  return (
    <>
      <Header scrollRatio={0} />
      <Banner
        category={post.category === 0 ? 'bugreport' : 'notice'}
        bannerImage={boardBanner}
      />
      <div className='max-w-4xl mx-auto p-4'>
        <div className='border-t-2 border-t-black'>
          <div className='flex justify-between items-center py-4 border-b border-[#00000026]'>
            <h1 className='text-xl font-medium'>{post.title}</h1>
            <div className='flex items-center gap-4'>
              <span className='text-sm text-gray-500'>
                {formatDate(post.createdAt)}
              </span>
              <span className='text-sm'>{post.writerNickname}</span>
            </div>
          </div>
          <div
            className='py-8 min-h-[400px]'
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
        <div className='flex justify-center mt-8 gap-2'>
          {isAdmin() && (
            <>
              <Link to={`/board/edit/${number}`}>
                <button className='mx-1.5 px-9 py-2 bg-[#000000c0] text-white hover:bg-black border border-black'>
                  수정하기
                </button>
              </Link>
              <button
                onClick={handleDelete}
                className='mx-1.5 px-9 py-2 bg-red-600 text-white hover:bg-red-700 border border-red-600'
              >
                삭제하기
              </button>
            </>
          )}
          <Link to='/board'>
            <button className='mx-1.5 px-9 py-2 bg-white border border-black hover:bg-gray-50 text-black'>
              목록
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default BoardDetail
