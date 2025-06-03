import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const styles = `
  @keyframes noise-1 {
    0% { clip-path: inset(40% 0 61% 0); }
    5% { clip-path: inset(92% 0 1% 0); }
    10% { clip-path: inset(43% 0 1% 0); }
    15% { clip-path: inset(25% 0 58% 0); }
    20% { clip-path: inset(71% 0 22% 0); }
    25% { clip-path: inset(100% 0 1% 0); }
    30% { clip-path: inset(31% 0 58% 0); }
    35% { clip-path: inset(79% 0 5% 0); }
    40% { clip-path: inset(54% 0 21% 0); }
    45% { clip-path: inset(35% 0 86% 0); }
    50% { clip-path: inset(70% 0 31% 0); }
    55% { clip-path: inset(95% 0 5% 0); }
    60% { clip-path: inset(58% 0 42% 0); }
    65% { clip-path: inset(82% 0 15% 0); }
    70% { clip-path: inset(23% 0 46% 0); }
    75% { clip-path: inset(100% 0 1% 0); }
    80% { clip-path: inset(54% 0 23% 0); }
    85% { clip-path: inset(12% 0 65% 0); }
    90% { clip-path: inset(92% 0 8% 0); }
    95% { clip-path: inset(37% 0 41% 0); }
    100% { clip-path: inset(64% 0 17% 0); }
  }

  @keyframes noise-2 {
    0% { clip-path: inset(26% 0 55% 0); }
    5% { clip-path: inset(88% 0 7% 0); }
    10% { clip-path: inset(21% 0 69% 0); }
    15% { clip-path: inset(71% 0 11% 0); }
    20% { clip-path: inset(84% 0 16% 0); }
    25% { clip-path: inset(32% 0 43% 0); }
    30% { clip-path: inset(92% 0 8% 0); }
    35% { clip-path: inset(44% 0 56% 0); }
    40% { clip-path: inset(67% 0 33% 0); }
    45% { clip-path: inset(89% 0 11% 0); }
    50% { clip-path: inset(43% 0 27% 0); }
    55% { clip-path: inset(76% 0 24% 0); }
    60% { clip-path: inset(35% 0 65% 0); }
    65% { clip-path: inset(92% 0 8% 0); }
    70% { clip-path: inset(56% 0 44% 0); }
    75% { clip-path: inset(82% 0 18% 0); }
    80% { clip-path: inset(15% 0 85% 0); }
    85% { clip-path: inset(94% 0 6% 0); }
    90% { clip-path: inset(48% 0 52% 0); }
    95% { clip-path: inset(67% 0 33% 0); }
    100% { clip-path: inset(37% 0 63% 0); }
  }

  @keyframes noise-3 {
    0% { clip-path: inset(31% 0 48% 0); }
    5% { clip-path: inset(78% 0 12% 0); }
    10% { clip-path: inset(15% 0 75% 0); }
    15% { clip-path: inset(61% 0 21% 0); }
    20% { clip-path: inset(94% 0 6% 0); }
    25% { clip-path: inset(22% 0 53% 0); }
    30% { clip-path: inset(82% 0 18% 0); }
    35% { clip-path: inset(54% 0 46% 0); }
    40% { clip-path: inset(77% 0 23% 0); }
    45% { clip-path: inset(79% 0 21% 0); }
    50% { clip-path: inset(33% 0 37% 0); }
    55% { clip-path: inset(96% 0 4% 0); }
    60% { clip-path: inset(25% 0 75% 0); }
    65% { clip-path: inset(82% 0 18% 0); }
    70% { clip-path: inset(46% 0 54% 0); }
    75% { clip-path: inset(72% 0 28% 0); }
    80% { clip-path: inset(25% 0 75% 0); }
    85% { clip-path: inset(84% 0 16% 0); }
    90% { clip-path: inset(38% 0 62% 0); }
    95% { clip-path: inset(57% 0 43% 0); }
    100% { clip-path: inset(27% 0 73% 0); }
  }
`

const NotFound = () => {
  return (
    <>
      <style>{styles}</style>
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-['Oswald'] overflow-hidden relative">
        <div className='text-center relative'>
          <h1 className='text-white text-2xl'>ERROR !</h1>

          <div style={{ position: 'relative' }}>
            <div className='text-white text-[8rem] font-bold mb-5'>404</div>
            <div
              className='text-[8rem] font-bold mb-5'
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                opacity: 0.8,
                animation: 'noise-1 1s infinite linear alternate-reverse',
                textShadow: '2px 0 #ff0000',
              }}
            >
              404
            </div>
            <div
              className='text-[8rem] font-bold mb-5'
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                opacity: 0.8,
                animation: 'noise-2 1s infinite linear alternate-reverse',
                textShadow: '-2px 0 #00ff00',
              }}
            >
              404
            </div>
            <div
              className='text-[8rem] font-bold mb-5'
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                opacity: 0.8,
                animation: 'noise-3 0.1s infinite linear alternate-reverse',
                textShadow: '1px 1px #0000ff',
              }}
            >
              404
            </div>
          </div>

          <p className='text-white text-xl tracking-widest'>
            페이지를 찾을 수 없습니다
          </p>

          <Button variant='UndAIed' size='notFound' className='text-base mt-5'>
            <Link to='/'>홈으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    </>
  )
}

export default NotFound
