import axios from 'axios'

interface RoomData {
  id: number
  title: string
  member: string
}

interface getRoomListResponse {
  data: RoomData[] // 실제 방 목록 데이터
  isLast: boolean // 마지막 페이지 여부
  total: number // 총 페이지 수수
}

const api = axios.create({
  baseURL: '/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const gameMainApi = {
  getRoomList: async ({ pageParam = 1 }): Promise<getRoomListResponse> => {
    const response = await api.get(`/${pageParam}`)
    return response.data
  },
}
