const EmptyProfile = () => {
  return (
    <div className='shadow-[0px_0px_16px_rgba(255,255,255,0.25)] border-2 border-solid border-[rgba(255,255,255,0.35)] w-full h-full bg-[black] flex items-center'>
      {/* <div className="hover:shadow-[0px_0px_16px_rgba(255,0,0,0.45)] w-full h-full hover:animate-ping text-white"></div> */}
      <div className='flex w-full text-base font-bold justify-center text-[#bbbbbb] mb-1 items-end'>
        <div className='h-[0.25em] w-[0.25em] bg-[#bbbbbb] rounded-full animate-bounce2 animation-delay1' />
        <div className='h-[0.25em] w-[0.25em] mx-1 bg-[#bbbbbb] rounded-full animate-bounce2 animation-delay2' />
        <div className='h-[0.25em] w-[0.25em] bg-[#bbbbbb] rounded-full animate-bounce2' />
      </div>
    </div>
  )
}

export default EmptyProfile
