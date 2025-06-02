import {
  useQuery,
  useMutation,
  useQueryClient,
  // QueryClient,
  // useInfiniteQuery,
} from '@tanstack/react-query'
import { boardApi, AdminBoardApi } from '../api/boardApi'
import type {
  BoardDetailResponse,
  BoardRequest,
  // Post,
  UpdatePostParams,
} from '../types/board'

//all list
export const useGetPosts = (categoryNum: number, currentPage: number) => {
  return useQuery({
    queryKey: ['posts', categoryNum, currentPage],
    queryFn: async () => {
      try {
        const response = await boardApi.getPosts(categoryNum, currentPage)
        return response.data.data || []
      } catch (error) {
        throw error
      }
    },
  })
}

//상세페이지
export const useGetPost = (id: number) => {
  return useQuery<BoardDetailResponse>({
    queryKey: ['post', id],
    queryFn: async () => {
      const response = await boardApi.getPost(id)
      return response.data
    },
  })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: BoardRequest) => {
      const response = await boardApi.createPost(data)
      return response.data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: UpdatePostParams) => boardApi.updatePost(id),

    onSuccess: (_, { id }) => {
      // 수정 성공 시 해당 게시글의 캐시를 무효화
      queryClient.invalidateQueries({ queryKey: ['posts', id] })
      // 게시글 목록 캐시도 무효화 (필요한 경우)
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export const useAdminUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: UpdatePostParams) =>
      AdminBoardApi.updatePost(id, data),

    onSuccess: (_, { id }) => {
      // 수정 성공 시 해당 게시글의 캐시를 무효화
      queryClient.invalidateQueries({ queryKey: ['posts', id] })
      // 게시글 목록 캐시도 무효화 (필요한 경우)
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: number) => boardApi.deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export function useAdminCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: BoardRequest) => {
      const response = await AdminBoardApi.createPost(data)
      return response.data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
