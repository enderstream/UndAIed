import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../components/SocketContext'

export const useSocket = () => {
  const context = useContext(SocketContext)
  const [isLoading, setIsLoading] = useState(true)

  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }

  const { socket, isConnected, connect } = context

  useEffect(() => {
    if (!socket && !isConnected) {
      try {
        const userDataString = localStorage.getItem('userPersist')
        if (!userDataString) {
          // throw new Error('No authentication token found');
          setIsLoading(false) // 에러를 던지지 않고 로딩만 완료
          return
        }
        const userData = JSON.parse(userDataString)
        const token = userData?.userState?.token

        if (!token) {
          // throw new Error('Invalid token format');
          setIsLoading(false)
          return
        }

        connect()
      } catch (error) {
        setIsLoading(false)
      }
    } else if (isConnected) {
      setIsLoading(false)
    }
  }, [socket, isConnected, connect])

  // 소켓 연결 상태 모니터링
  useEffect(() => {
    if (socket) {
      socket.on('disconnect', () => {
        setIsLoading(true)
      })

      socket.on('connect', () => {
        setIsLoading(false)
      })

      socket.on('connect_error', error => {
        console.error('Socket connection error:', error)
        setIsLoading(false)
      })

      return () => {
        socket.off('disconnect')
        socket.off('connect')
        socket.off('connect_error')
      }
    }
  }, [socket])

  if (isLoading) {
    return null
  }

  return socket
}
