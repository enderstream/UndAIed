import { Outlet } from 'react-router'
import { SocketProvider } from '../../components/SocketContext'
import { useRecoilValue } from 'recoil'
import { userState } from '../../store/userState'
import NoTokenAlert from './components/NoTokenAlert'

const Game = () => {
  const userData = useRecoilValue(userState)

  // userData.token 이 없으면 로그인 필요 안내창 렌더링
  if (!userData?.token) {
    return <NoTokenAlert />
  }

  return (
    <SocketProvider url={import.meta.env.VITE_SOCKET_URL}>
      <Outlet />
    </SocketProvider>
  )
}

export default Game
