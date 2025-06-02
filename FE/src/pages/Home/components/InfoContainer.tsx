interface IInfoContainer {
  title: string
  context: string
  img: string
}
const InfoContainer = ({ title, context, img }: IInfoContainer) => {
  return (
    <div className='border-2 border-[#555555] rounded-xl p-8 grow min-h-[360px] h-full max-h-[60vw] flex flex-col aspect-square'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-3xl font-extrabold text-gray-200 mb-4'>{title}</h1>
        <div className='min-h-[110px]'>
          <h3 className='text-lg text-[#a1a1aa] font-normal mb-4'>{context}</h3>
        </div>
      </div>
      <div>
        <img
          className='border-2 border-[#3f3f3f] opacity-95'
          src={img}
          alt=''
        />
      </div>
    </div>
  )
}

export default InfoContainer
