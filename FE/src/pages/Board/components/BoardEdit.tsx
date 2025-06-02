import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { jwtDecode } from 'jwt-decode'
import bugReportImage from '../../../assets/board/bugReport.png'
import Banner from './Banner'
import {
  useAdminUpdatePost,
  useGetPost,
  // useUpdatePost,
} from '../../../hooks/useBoard'
import type { BoardRequest } from '../../../types/board'
import Header from '../../../components/Header'

interface JWTPayload {
  roles: string
}

const BoardEdit = () => {
  const { number } = useParams<{ number: string }>()
  const navigate = useNavigate()
  const { data: postData, isLoading, isError } = useGetPost(Number(number))
  const updatePost = useAdminUpdatePost()

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BoardRequest>({
    defaultValues: {
      category: 0,
      title: '',
      content: '',
    },
  })

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

  useEffect(() => {
    // ADMIN이 아니면 접근 차단
    if (!isAdmin()) {
      alert('접근 권한이 없습니다.')
      navigate('/board')
      return
    }
  }, [navigate])

  useEffect(() => {
    if (postData?.data) {
      setValue('title', postData.data.title)
      setValue('content', postData.data.content)
      setValue('category', postData.data.category)
    }
  }, [postData, setValue])

  const onSubmit = async (data: BoardRequest) => {
    try {
      if (!number) return
      await updatePost.mutateAsync({
        id: Number(number),
        data: {
          title: data.title,
          content: data.content,
          category: data.category,
        },
      })
      alert('게시글이 수정되었습니다.')
      navigate(`/board/${number}`)
    } catch (error) {
      console.error('Error:', error)
      alert('게시글 수정 중 오류가 발생했습니다.')
    }
  }

  if (isLoading) return <div>로딩중...</div>
  if (isError) return <div>에러가 발생했습니다.</div>
  if (!postData?.data) return <div>게시글을 찾을 수 없습니다.</div>

  return (
    <>
      <Header scrollRatio={100} />
      <div className='h-14' />
      <Banner bannerImage={bugReportImage} category='write' />
      <div className='max-w-4xl mx-auto p-4'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4 border-t-2 border-t-black'>
            <Controller
              name='title'
              control={control}
              rules={{ required: '제목을 입력하세요.' }}
              render={({ field }) => (
                <input
                  {...field}
                  type='text'
                  placeholder='제목을 입력하세요'
                  className='focus:outline-none w-full py-2 px-4 border border-gray-300'
                />
              )}
            />
            {errors.title && typeof errors.title.message === 'string' && (
              <p className='text-red-500'>{errors.title.message}</p>
            )}
          </div>
          <div>
            <Controller
              name='content'
              control={control}
              rules={{ required: '내용을 입력하세요.' }}
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder='내용을 입력하세요'
                  className='w-full h-96 p-4 border border-gray-300 focus:outline-none resize-none'
                />
              )}
            />
            {errors.content && typeof errors.content.message === 'string' && (
              <p className='text-red-500'>{errors.content.message}</p>
            )}
          </div>
          <div className='flex justify-center pt-4'>
            <button
              type='submit'
              className='mx-1.5 px-9 py-2 bg-[#000000c0] text-white hover:bg-black border border-black'
            >
              수정하기
            </button>
            <Link
              to={`/board/detail/${number}`}
              className='mx-1.5 px-9 py-2 bg-white border border-transparent text-black hover:border hover:border-black'
            >
              취소
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default BoardEdit
