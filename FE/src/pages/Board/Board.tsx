import { useParams } from "react-router";
import { useRecoilState } from "recoil";
import { currentPageState } from "../../store/boardState";
// import { useEffect } from "react";
import boardBanner from "../../assets/board/upscalingBoard.png";

import Banner from "./components/Banner";
import CategoryNav from "./components/CategoryNav";
import PostList from "./components/PostList";
import Pagination from "./components/Pagination";
import Header from "../../components/Header";
import { useGetPosts } from "../../hooks/useBoard";
import { CategoryType } from "../../types/board";

function Board() {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const { category } = useParams<{ category: string }>();

  // const [boardRefresh] = useRecoilState(boardRefreshState);

  const validateCategory = (cat: string | undefined): CategoryType => {
    if (cat === "bugreport") return "bugreport";
    if (cat === "notice") return "notice";
    if (cat === "write") return "write";
    return "notice";
  };

  const validCategory = validateCategory(category);
  const categoryNum = validCategory === "bugreport" ? 1 : 0;

  const { data, isLoading, isError } = useGetPosts(categoryNum, currentPage);

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러입니다</div>;
  }

  const postPerPage = 10;
  const totalPages = data.totalPages;
  const currentPosts = data.content;

  const pageGroupSize = 5;
  const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
  const startPage = currentGroup * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "-";

      const now = new Date();
      const diffInMilliseconds = now.getTime() - date.getTime();
      const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
      const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
      const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
      const diffInMonths = Math.floor(diffInDays / 30);
      const diffInYears = Math.floor(diffInDays / 365);

      if (diffInMinutes < 1) {
        return "방금 전";
      } else if (diffInMinutes < 60) {
        return `${diffInMinutes}분 전`;
      } else if (diffInHours < 24) {
        return `${diffInHours}시간 전`;
      } else if (diffInDays < 30) {
        return `${diffInDays}일 전`;
      } else if (diffInMonths < 12) {
        return `${diffInMonths}달 전`;
      } else {
        return `${diffInYears}년 전`;
      }
    } catch (error) {
      return "-";
    }
  };

  return (
    <>
      <Header scrollRatio={0} />
      <Banner category={validCategory} bannerImage={boardBanner} />
      <CategoryNav category={validCategory} />
      <PostList
        currentPosts={currentPosts}
        currentPage={currentPage}
        postPerPage={postPerPage}
        formatDate={formatDate}
      />
      <Pagination
        currentPage={currentPage}
        endPage={endPage}
        startPage={startPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default Board;
