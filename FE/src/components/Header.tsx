import { Link } from 'react-router-dom'
// import { Link, useNavigate } from "react-router-dom";
// import React, { useState } from "react";
import Logo from '../assets/svg-icon/game_logo.svg'
import { useRecoilValue } from 'recoil'
import { userState } from '../store/userState'
import { HashLink } from 'react-router-hash-link'

interface IHeaderProps {
  scrollRatio: number
}

const Header = ({ scrollRatio }: IHeaderProps) => {
  // const [scrollTop, setScrollTop] = useState(0);

  // const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
  //   // const currentScrollTop = event.currentTarget.scrollTop;
  //   // setScrollTop(currentScrollTop);
  // };

  // const navigate = useNavigate();

  // const onBoardClick = () => {
  //   navigate("/board");
  // };

  // const goToLogin = () => {
  //   navigate("#login");
  // };
  const userData = useRecoilValue(userState)
  const isLogin = userData.isLogin

  return (
    <header
      // onScroll={handleScroll}
      className='fixed z-40 flex flex-col w-screen h-14 pt-4 primary-bg-black header-style'
    >
      <nav>
        <ul className='flex justify-between'>
          <div className='flex items-center'>
            <li className='ml-12'>
              <Link to='/'>
                <img src={Logo} alt='로고' />
              </Link>
            </li>
            <li className='ml-12'>
              <Link to='/board/notice' className='font-medium text-gray-300'>
                공지사항
              </Link>
            </li>
            <li className='ml-12'>
              <Link to='/board/bugreport' className='font-medium text-gray-300'>
                버그리포트
              </Link>
            </li>
          </div>

          <li className='mr-8 text-gray-300'>
            {!isLogin ? (
              <HashLink to='/#login' smooth className='font-semibold'>
                로그인
              </HashLink>
            ) : (
              <span className='font-semibold'>
                {userData.nickname}님 환영합니다!
              </span>
            )}
          </li>
        </ul>
      </nav>

      <div
        className='header-bottom-style'
        style={{
          background: `linear-gradient(to right, #eee, #eee ${scrollRatio}%, #333 ${scrollRatio}%)`,
        }}
      />
    </header>
  )
}

export default Header
