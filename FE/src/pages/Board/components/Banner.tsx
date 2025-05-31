import { BannerProps, CategoryType } from "../../../types/board";

function Banner({ category, bannerImage }: BannerProps): JSX.Element {
  const CATEGORY_NAME: Record<CategoryType, string> = {
    bugreport: "버그리포트",
    notice: "공지사항",
    write: "글쓰기",
  };

  return (
    <>
      <div
        className="border w-full h-[370px] bg-[#c73838] bg-cover bg-no-repeat relative"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50% 60%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black">
          <div className="relative ml-[17%] z-10 h-full flex flex-col justify-center items-left text-white">
            <div className="text-5xl">{CATEGORY_NAME[category]}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
