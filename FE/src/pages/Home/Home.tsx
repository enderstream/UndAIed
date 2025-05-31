import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import Header from "../../components/Header";
import HeaderTemp from "../../components/HeaderTemp";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
// import {  faChevronDown,  faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/svg-icon/game_logo.svg";
import InfoContainer from "./components/InfoContainer";

import { useRecoilValue } from "recoil";
import { userState } from "../../store/userState";
import LoginContainer from "./components/LoginContainer";
import LogoutContainer from "./components/LogoutContainer";

import { preloadAudio } from "../../util/AudioCache";
import lobbyBgm from "../../assets/bgm/lobby.mp3";
import gameRoomBgm from "../../assets/bgm/game-room.mp3";
import clickSound from "../../assets/bgm/click.mp3";
import myPageBgm from "../../assets/bgm/my-page.mp3";
import introBgm from "../../assets/bgm/intro.mp3";
import slideSound from "../../assets/bgm/slide.mp3";

import Img1 from "../../assets/tutorial/1.png";
import Img2 from "../../assets/tutorial/2.png";
import Img3 from "../../assets/tutorial/3.png";
import Img4 from "../../assets/tutorial/4.png";
import Img5 from "../../assets/tutorial/5.png";

// interface IBoard {
//   id: number;
//   tag: string;
//   title: string;
//   date: string; // true면 내가 보낸 메시지, false면 상대방 메시지
// }

function Home() {
  //fontawsome 타입 선언
  // const downChervon: IconDefinition = faChevronDown;
  // const rightChervon: IconDefinition = faChevronRight;

  // const [offset, setOffset] = useState(0);
  const [scrollRatio, setScrollRatio] = useState(0);
  const INFO_VIEWPORT = 2;
  const [infoScrollRatio, setInfoScrollRatio] = useState(0);

  const userInfo = useRecoilValue(userState);

  //게시글 관련
  // const [boards, setBoards] = useState<IBoard[]>([
  //   { id: 0, tag: "공지", title: "첫번째 공지", date: "2025-02-03" },
  //   { id: 1, tag: "공지", title: "두번째 공지", date: "2025-02-03" },
  //   { id: 2, tag: "공지", title: "세번째 공지", date: "2025-02-03" },
  //   { id: 3, tag: "공지", title: "네번째 공지", date: "2025-02-03" },
  //   { id: 4, tag: "공지", title: "다섯번째 공지", date: "2025-02-03" },
  //   { id: 5, tag: "공지", title: "여섯번째 공지", date: "2025-02-03" },
  //   { id: 6, tag: "공지", title: "일곱번째 공지", date: "2025-02-03" },
  // ]);

  useEffect(() => {
    const audioFiles = [
      lobbyBgm,
      gameRoomBgm,
      clickSound,
      slideSound,
      myPageBgm,
      introBgm,
    ];

    audioFiles.forEach((src) => preloadAudio(src));
  }, []);
  // 스크롤 감지 핸들러
  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight; // 전체 문서 높이
      const winHeight = window.innerHeight; // 뷰포트 높이
      const infoHeigt = winHeight * INFO_VIEWPORT; // 안내 스크린 끝까지의 높이이
      const totalScrollableHeight = docHeight - winHeight; // 스크롤 가능한 전체 높이
      // setOffset(window.scrollY);
      setScrollRatio(
        window.scrollY === 0
          ? 0
          : (window.scrollY / totalScrollableHeight) * 100
      );
      setInfoScrollRatio(
        window.scrollY === 0
          ? 0
          : window.scrollY / infoHeigt > 1
          ? 100
          : (window.scrollY / infoHeigt) * 100
      );
    };
    // clean up code
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // const ONE_HOUR = 3600000; // 1시간
    // const visitedTime = localStorage.getItem("visitedTime");
    // const now = Date.now();
    // // 방문 기록이 없는 경우 => 현재 시간 저장, tutorial 시작 (top: 0)
    // if (!visitedTime) {
    //   localStorage.setItem("visitedTime", now.toString());
    //   return;
    // }
    // // 방문 기록이 존재하는 경우
    // const diff = now - parseInt(visitedTime, 10);
    // if (diff < ONE_HOUR) {
    //   // 1시간 이내 재방문 => 튜토리얼 스킵
    //   window.scrollTo({
    //     top: window.innerHeight * 3,
    //     behavior: "instant", // 'smooth'로 변경 가능
    //   });
    // } else {
    //   // 1시간 이상 지남 => visitedTime 갱신, 다시 튜토리얼 보여주기
    //   localStorage.setItem("visitedTime", now.toString());
    //   // 굳이 따로 scrollTo(0) 할 필요 없이, 기본이 0 위치이므로 생략 가능
    // }
  }, []);

  // const onChervonClick = () => {
  //   window.scrollTo({
  //     top: window.innerHeight * 3,
  //     behavior: "smooth",
  //   });
  // };

  return (
    <div className="">
      <Header scrollRatio={scrollRatio} />
      <HeaderTemp />

      {/* 메인 튜토리얼 소개 컴포넌트 */}
      <div className="flex">
        <div className="on-scroll flex w-screen min-h-[calc(100vh-3.5rem)]">
          <div className="w-[1px] h-[300vh] primary-bg-black"></div>
          <div className="grow flex flex-col sticky top-[3.5rem] overflow-hidden h-[calc(100vh-3.5rem)] primary-bg-black">
            <div className="flex flex-col flex-grow h-full w-full max-w-screen-md self-start pt-8 pb-4 px-14">
              <span className="text-gray-100 mb-10 text-4xl font-extrabold leading-none tracking-tight">
                실시간 채팅 기반 AI 추론 게임
              </span>
              <div className="grow relative">
                <div
                  className="absolute top-0 left-0 w-auto h-[90%] flex gap-8 transition-transform"
                  style={{
                    transform: `translateX(calc(-${infoScrollRatio}% + ${
                      (infoScrollRatio / 100) * 720
                    }px))`,
                  }}
                >
                  <InfoContainer
                    title="1. 게임 참가"
                    context="우측에 GAME START 버튼을 눌러, 게임 로비로 이동합니다. 방을 만들거나 만들어진 방에 참여할 수 있습니다."
                    img={Img1}
                  />
                  <InfoContainer
                    title="2. 게임 시작"
                    context="참가자가 6명이 되면 방장이 게임을 시작할 수 있습니다. 게임이 시작되면, 2명의 AI가 여러분 사이에 숨게 됩니다."
                    img={Img2}
                  />
                  <InfoContainer
                    title="3. 주제 토론 시간"
                    context="주어진 질문에 맞게, 자신의 생각을 답변하세요. 한번만 답변할 수 있습니다."
                    img={Img3}
                  />
                  <InfoContainer
                    title="4. 자유 토론 시간"
                    context="주제 토론의 답변을 근거로 자유롭게 토론을 진행합니다. 물론 주제와 관련 없는 이야기로도 대화를 나누어보세요."
                    img={Img4}
                  />
                  <InfoContainer
                    title="5. 투표 시간 / 밤 시간"
                    context="AI 같은 사람에게 투표하세요! 가장 많은 투표를 받은 참가자가 처형됩니다. 밤 시간이 되면 AI가 인간 한 명을 처형합니다. 여러분은 AI를 모두 찾아낼 수 있을까요?"
                    img={Img5}
                  />
                </div>
              </div>
              {/* <div className="flex justify-center">
              <button
                className="group w-[4.5rem] h-[4.5rem] flex flex-col justify-center items-center text-white transition-all mt-2"
                onClick={onChervonClick}
              >
                <FontAwesomeIcon
                  className="animate-bounce w-[1.2rem] h-[1.2rem]"
                  icon={downChervon}
                />
                <h1 className="opacity-0 group-hover:opacity-100 transition-all">
                  게임 시작
                </h1>
              </button>
            </div> */}
            </div>
          </div>
        </div>
        {/* 우측 사이드바 컴포넌트 */}
        <div className="fixed right-0 z-50 w-[600px] min-h-[calc(100vh-3.5rem)] bg-gradient-to-l from-black via-black to-transparent flex flex-col justify-center items-end pr-8">
          {userInfo.isLogin ? (
            <LoginContainer userInfo={userInfo} />
          ) : (
            <LogoutContainer />
          )}
        </div>
      </div>

      {/* 아래 공지사항 목록 컴포넌트 */}
      {/* <div className="flex justify-center bg-[#f7f7f7]">
        <div className="relative white-container min-h-[calc(70vh-3.5rem)] py-10 flex md:pl-[calc(32rem+2rem)] lg:pl-[calc(42rem+2rem)]">
          <div className="md:flex hidden w-[32rem] lg:w-[42rem] left-[max(0px,calc(50%-45rem))] absolute mr-[2rem]">
            <div className="w-1/2 pr-6">
              <Link to={"/board"} className="text-lg font-bold text-[#872341]">
                공지사항{" "}
                <FontAwesomeIcon
                  className="w-[1rem] h-[1rem]"
                  icon={rightChervon}
                />
              </Link>
              <ul className="board-container mt-3">
                {boards.map((board: IBoard) => (
                  <Link className="" to="/" key={`info-${board.id}`}>
                    <li className="board-content font-medium">
                      <span className="board-content-title text-ellipsis">
                        {board.title}
                      </span>
                      <span className="board-content-date text-ellipsis">
                        {board.date}
                      </span>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
            <div className="w-1/2 pr-6">
              <Link to={"/board"} className="text-lg font-bold text-[#872341]">
                버그 제보{" "}
                <FontAwesomeIcon
                  className="w-[1rem] h-[1rem]"
                  icon={rightChervon}
                />
              </Link>
              <ul className="board-container mt-3">
                {boards.map((board: IBoard) => (
                  <Link className="" to="/" key={`bug-${board.id}`}>
                    <li className="board-content font-medium">
                      <span className="board-content-title">{board.title}</span>
                      <span className="board-content-date">{board.date}</span>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div> */}

      {/* footer */}
      <div className="footer min-h-[calc(30vh)] primary-bg-black p-9 text-white flex flex-col items-center">
        <img src={Logo} alt="" className="mb-9" />
        <span className="text-[#a1a1aa] text-xs mb-4">
          © SSAFY Korea Corp. & Daejeon 2nd Class B212
        </span>

        <nav className="border-[#555555] border-t-2 w-[48rem]">
          <ul className="flex space-x-6 text-gray-300 text-sm h-8 justify-center items-center">
            <Link to={"/"} className="hover:text-white cursor-pointer">
              계정정보
            </Link>
            <div className="h-4 w-[0.125rem] bg-[#555555]"></div>
            <Link to={"/"} className="hover:text-white cursor-pointer">
              계정활동
            </Link>
            <div className="h-4 w-[0.125rem] bg-[#555555]"></div>
            <Link
              to={"/policy"}
              className="hover:text-white cursor-pointer font-bold"
            >
              개인정보처리방침
            </Link>
            <div className="h-4 w-[0.125rem] bg-[#555555]"></div>
            <Link to={"/policy"} className="hover:text-white cursor-pointer">
              이용약관
            </Link>
            <div className="h-4 w-[0.125rem] bg-[#555555]"></div>

            <Link to={"/policy"} className="hover:text-white cursor-pointer">
              운영정책
            </Link>
            <div className="h-4 w-[0.125rem] bg-[#555555]"></div>
            <Link to={"/"} className="hover:text-white cursor-pointer">
              회사소개
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Home;
