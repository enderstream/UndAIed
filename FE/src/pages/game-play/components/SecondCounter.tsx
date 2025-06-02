import { useState, useEffect, useRef } from 'react'

interface ISecondsProps {
  initialSeconds: number
  maxSeconds: number | string
  stage: string | number
}

const SecondCounter = ({
  initialSeconds,
  maxSeconds,
  stage,
}: ISecondsProps) => {
  const [seconds, setSeconds] = useState(initialSeconds)
  const circleRef = useRef<SVGCircleElement | null>(null)

  useEffect(() => {
    if (maxSeconds === 0) {
      setSeconds(0)
    } else {
      setSeconds(initialSeconds)
    }
    // 1초에 한 번씩 seconds를 1씩 줄인다.
    const intervalId = setInterval(() => {
      setSeconds(prev => {
        // 0 이하가 되면 타이머 정지
        if (prev <= 1) {
          clearInterval(intervalId)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // 컴포넌트 언마운트 시 인터벌 정리
    return () => clearInterval(intervalId)
  }, [initialSeconds, maxSeconds, stage])

  useEffect(() => {
    // 원형 진행도 업데이트
    if (circleRef.current) {
      const circumference = 151 // circle에 설정한 strokeDasharray
      const maxVal = Number(maxSeconds)
      const progress = maxVal > 0 ? seconds / maxVal : 0
      const offset = circumference - progress * circumference
      circleRef.current.style.strokeDashoffset = String(offset)
    }
  }, [seconds, maxSeconds])

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='relative'>
        <svg className='-rotate-90 h-16 w-16'>
          <circle
            r='24'
            cx='32'
            cy='32'
            className='fill-transparent  stroke-[black] stroke-[4px]'
          />
          <circle
            r='24'
            cx='32'
            cy='32'
            ref={circleRef}
            style={{
              strokeDasharray: '151px',
              strokeDashoffset: 0,
            }}
            className='fill-transparent stroke-[#44C553] stroke-[4px]'
          />
        </svg>
        <div className='text-white absolute text-lg font-semibold flex flex-col items-center w-16 h-20 top-[16px]'>
          <span>{seconds}s</span>
        </div>
      </div>
    </div>
  )
}

export default SecondCounter
