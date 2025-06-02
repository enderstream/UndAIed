import { Link, useNavigate } from 'react-router-dom'
import power from '../../../assets/icon/power.png'
import logo from '../../../assets/svg-icon/game_logo.svg'
const GameHeader = () => {
  const navigate = useNavigate()

  const handleExite = () => {
    if (confirm('정말 종료하시겠습니까?')) {
      navigate('/')
    }
  }

  return (
    <header className='z-50 md:p-6  border-black flex justify-between items-center px-6'>
      <Link to='/game'>
        <img src={logo} alt='로고' className='h-6' />
      </Link>
      <button
        onClick={handleExite}
        className='px-2 py-1 rounded-lg duration-300 hover:bg-[#f8376467] hover:border-[#f93c4f] hover:shadow-[#F74A5C]'
      >
        <img src={power} alt='' />
      </button>
    </header>
  )
}

export default GameHeader
