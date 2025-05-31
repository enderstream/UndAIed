import { useEffect, useRef, useState } from "react";

interface DonutChartProps {
  percent?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

function DonutChart({
  percent = 65,
  size = 200,
  strokeWidth = 20,
  color = "#fb472c",
}: DonutChartProps) {
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.style.setProperty("--percent", String(percent));
    }
    // 컴포넌트 마운트 후 애니메이션 시작
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [percent]);

  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = isVisible
    ? circumference - (circumference * percent) / 100
    : circumference;

  return (
    <div className="relative inline-block text-gray-500" ref={chartRef}>
      <div className="relative">
        <svg
          className={`transform -rotate-90 md:p-5 w-[150px] h-[150px] md:w-[250px] md:h-[250px]`}
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background circle */}
          <circle
            className="fill-transparent"
            cx={center}
            cy={center}
            r={radius}
            stroke="#201111"
            strokeWidth={strokeWidth}
          />
          {/* Foreground circle */}
          <circle
            className="fill-transparent transition-all duration-1000 ease-in-out"
            cx={center}
            cy={center}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="butt"
          />
        </svg>
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-semibold">{percent}%</span>
        </div>
      </div>
    </div>
  );
}

export default DonutChart;
