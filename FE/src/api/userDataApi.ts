import type { ProfileUpdate } from '../types/user'
import { apiClient } from '@/api/apiClient'

export const updateProfile = async (data: ProfileUpdate) => {
  const response = await apiClient.patch('api/v1/user/profile', data)

  // status가 400인 경우 에러 객체 반환
  if (response.data.status === 400) {
    return {
      error: true,
      message: '프로필 업데이트 에러',
    }
  }

  return response.data
}
