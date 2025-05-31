// CategoryNav.tsx
import { Link } from "react-router-dom";
import { BannerProps } from "../../../types/board";
import { useRecoilState } from "recoil";
import { currentPageState } from "../../../store/boardState";
// import { boardRefreshState, currentPageState } from "../../../store/boardState";
// import { boardApi } from "../../../api/boardApi";
// import { useQueryClient } from "@tanstack/react-query";

// const getCategoryNum = (category: string) => {
//   switch (category) {
//     case "notice":
//       return 0;
//     case "bugreport":
//       return 1;
//     default:
//       return 0;
//   }
// };

function CategoryNav({ category }: BannerProps) {
  const [_, setCurrentPage] = useRecoilState(currentPageState);
  // 현재 카테고리의 1페이지 데이터를 미리 불러오기

  // const handleCategoryClick = (targetCategory: string) => {
  const handleCategoryClick = () => {
    setCurrentPage(1);
    // 클릭한 카테고리의 데이터를 미리 불러오기
  };

  return (
    <ul className="w-full max-w-[1260px] mx-auto flex flex-col sm:flex-row mt-10 h-14">
      <li
        className={`${
          category === "notice"
            ? "border border-x-black border-t-black border-b-0"
            : "text-[#868686] border-b border-black"
        } flex items-center w-full sm:w-1/2`}
      >
        <Link
          to="/board/notice"
          className="w-full text-center"
          onClick={() => handleCategoryClick()}
          // onClick={() => handleCategoryClick("notice")}
        >
          공지사항
        </Link>
      </li>
      <li
        className={`${
          category === "bugreport"
            ? "border border-x-black border-t-black border-b-0"
            : "text-[#868686] border-b border-black"
        } flex items-center w-full sm:w-1/2`}
      >
        <Link
          to="/board/bugreport"
          className="w-full text-center"
          onClick={() => handleCategoryClick()}
          // onClick={() => handleCategoryClick("bugreport")}
        >
          버그리포트
        </Link>
      </li>
    </ul>
  );
}

export default CategoryNav;
