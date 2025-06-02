export interface Post {
  boardId: number
  category: string
  title: string
  viewCnt: number
  writerNickname: string
  createdAt: string
  updatedAt: string
}

export interface TableProps {
  currentPosts: Post[]
  currentPage: number
  postPerPage: number
}

export interface PostListProps {
  currentPosts: Post[]
  currentPage: number
  postPerPage: number
  formatDate: (dateString: string) => string
}

export interface PaginationProps {
  currentPage: number
  endPage: number
  startPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export type CategoryType = 'bugreport' | 'notice' | 'write'

export interface BannerProps {
  category: CategoryType
  bannerImage?: string
}

export interface Category {
  category: string
}

export interface BoardRequest {
  title: string
  content: string
  category: number
}
export interface UpdatePostParams {
  id: number
  data: Partial<BoardRequest>
}

// export interface BoardDetailResponse {
//   boardId: number;
//   title: string;
//   content: string;
//   writerNickname: string;
//   category: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

export interface BoardDetailResponse {
  timeStamp: string
  isSuccess: boolean
  status: number
  message: string
  data: {
    boardId: number
    title: string
    content: string
    writerNickname: string
    category: number
    createdAt: string
    updatedAt: string
  }
}
