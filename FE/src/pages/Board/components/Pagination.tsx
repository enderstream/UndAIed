import leftArrow from '../../../assets/icon/left.svg'
import rightArrow from '../../../assets/icon/right.svg'
import type { PaginationProps } from '../../../types/board'

const Pagination = ({
  currentPage,
  endPage,
  startPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const movePrevPage = () => {
    onPageChange(Math.max(currentPage - 1, 1))
  }

  const moveNextPage = () => {
    onPageChange(Math.max(currentPage + 1, 1))
  }

  return (
    <div className='flex justify-center mt-12 mb-44 '>
      <div className='flex gap-2'>
        <button
          onClick={movePrevPage}
          className='px-3 py-3 border-[#00000026] border hover:border-black'
          disabled={currentPage === 1}
        >
          <img src={leftArrow} alt='left' />
        </button>

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
          <button
            key={startPage + i}
            onClick={() => onPageChange(startPage + i)}
            className={`px-4 py-3  text-black hover:bg-[#323232] hover:text-white ${
              currentPage === startPage + i
                ? 'bg-black text-white pointer-events: none'
                : ''
            }`}
          >
            {startPage + i}
          </button>
        ))}
        <button
          onClick={moveNextPage}
          className='px-3 py-3 border-[#00000026] border hover:border-black '
          disabled={currentPage === totalPages}
        >
          <img src={rightArrow} alt='left' />
        </button>
      </div>
    </div>
  )
}

export default Pagination
