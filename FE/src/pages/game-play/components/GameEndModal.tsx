import { Link } from 'react-router'
import type { IGameResultSend } from '../../../types/gameplay'

interface IGameEndModal {
  gameResult: IGameResultSend
}

const GameEndModal = (resultData: IGameEndModal) => {
  const isHumanWin = resultData.gameResult.winner === 'HUMAN'

  const borderAndTextColor = isHumanWin
    ? 'border-[#00b9fc] text-[#00b9fc]'
    : 'border-[#ff3333] text-[#ff3333]'
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      {/* 모달 내용 */}
      <div className='relative w-full max-w-md'>
        <div
          className={`modal-open h-auto bg-gray-950 border-t-2 border-b-2 rounded-md shadow-xl py-6 px-8 ${borderAndTextColor}`}
        >
          <h1 className='text-center text-xl font-bold mb-6'>
            {isHumanWin ? '인간 승리' : 'AI 승리'}
          </h1>

          {/* 플레이어 정보 */}
          <div className='flex justify-between text-white'>
            {/* 왼쪽 4명 */}
            <div className='flex flex-col space-y-1'>
              {resultData.gameResult.players
                .slice(0, 4)
                .map((player, index) => (
                  <div key={index}>
                    익명{player.number}: {player.nickname}
                  </div>
                ))}
            </div>
            {/* 오른쪽 4명 */}
            <div className='flex flex-col space-y-1'>
              {resultData.gameResult.players
                .slice(4, 8)
                .map((player, index) => (
                  <div key={index}>
                    익명{player.number}: {player.nickname}
                  </div>
                ))}
            </div>
          </div>

          <div className='flex justify-center mt-4'>
            <Link className='p-1' to={'/game'}>
              로비로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameEndModal
