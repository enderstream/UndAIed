import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../api/apiClient'
import { useRecoilValue } from 'recoil'
import { userState } from '../store/userState'
import { updateProfile } from '../api/userDataApi'
import { toast } from 'sonner'

export function useUserProfile() {
  const user = useRecoilValue(userState)

  return useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const response = await apiClient.get('api/v1/user/profile')
      // console.log("유저 데이터 수신 완료", response);
      return response.data
    },
    enabled: !!user.token, // 토큰이 있을 때만 쿼리 실행
    retry: 1,
    refetchOnWindowFocus: false,
  })
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: data => {
      // 에러 객체가 반환된 경우
      if (data.error) {
        toast.error('프로필 업데이트 오류')
        return
      }

      // 성공한 경우
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
      toast.success('프로필이 성공적으로 업데이트 되었습니다.')
    },
    onError: error => {
      toast.error('프로필 업데이트에 실패했습니다.')
      console.error('프로필 업데이트 오류: ', error)
    },
  })
}
