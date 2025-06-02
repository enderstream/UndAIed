import { useRecoilValue } from 'recoil'
import { boardRefreshState } from '../../../store/boardState'
import type { PostListProps, Post } from '../../../types/board'
import WriteButton from './WriteButton'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const PostList = ({
  currentPosts,
  postPerPage,
  currentPage,
  formatDate,
}: PostListProps) => {
  const boardRefresh = useRecoilValue(boardRefreshState)

  interface JWTPayload {
    roles: string
  }

  const userData = localStorage.getItem('userPersist')
  const token = userData ? JSON.parse(userData)?.userState?.token : null
  const decodeToken = (token: string | null) => {
    if (!token) return null
    try {
      return jwtDecode<JWTPayload>(token)
    } catch (error) {
      return null
    }
  }

  const { category } = useParams<{ category: string }>()
  const userRole = decodeToken(token)?.roles
  // console.log(userRole);

  useEffect(() => {}, [boardRefresh])

  return (
    <main className='w-full max-w-[1260px] mx-auto'>
      <div className='bg-white overflow-x-auto '>
        <table className='w-full min-w-[768px]'>
          <tbody>
            {currentPosts.map((post: Post, index: number) => (
              <tr
                key={index}
                className='border-b transition-colors hover:bg-gray-50'
              >
                <td className='py-4 px-6 sm:px-6 text-center whitespace-nowrap'>
                  {(currentPage - 1) * postPerPage + index + 1}
                </td>
                <Link to={`/board/detail/${post.boardId}`}>
                  <td className='py-4 px-6 sm:px-6 truncate'>{post.title}</td>
                </Link>
                <td className='py-4 sm:px-6 text-center whitespace-nowrap '>
                  {`${post.viewCnt} view`}
                </td>
                <td className='py-4 px-4 sm:px-6 text-center whitespace-nowrap'>
                  {formatDate(post.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(token && userRole === 'ROLE_ADMIN' && category !== 'bugreport') ||
      category === 'bugreport' ? (
        <WriteButton />
      ) : null}
    </main>
  )
}

export default PostList
