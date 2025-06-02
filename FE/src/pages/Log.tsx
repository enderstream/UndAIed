import { useParams } from 'react-router-dom'

const Log = () => {
  const { gameId } = useParams()

  return (
    <>
      <h1>Log page</h1>
      <span>게임 아이디: {gameId}</span>
    </>
  )
}

export default Log
