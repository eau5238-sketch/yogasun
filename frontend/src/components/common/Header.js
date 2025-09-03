import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useApp } from "../contexts/AppContext";

const Header = () => {
  const { isLoggedIn, setShowLogin, setShowRegister, logout, user } = useApp();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: "/", label: "홈", icon: "🏠" },
    { path: "/classes", label: "수업", icon: "🧘‍♀️" },
    { path: "/instructors", label: "강사", icon: "👥" },
    { path: "/meditation", label: "명상", icon: "🧠" },
    { path: "/community", label: "커뮤니티", icon: "💬" },
  ];

  // 로그인 상태에 따른 메뉴 클릭 처리
  const handleMenuClick = (e, path) => {
    if (!isLoggedIn && path !== "/") {
      e.preventDefault();
      alert("로그인 후 이용 가능합니다.");
      setShowLogin(true);
      return;
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const handleLogin = () => {
    setShowLogin(true);
    setIsMobileMenuOpen(false);
  };

  const handleRegister = () => {
    setShowRegister(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* 로고 */}
          <Link
            to="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="text-2xl">🧘‍♀️</span>
            <span className="text-xl font-bold text-purple-600">MindYoga</span>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => handleMenuClick(e, item.path)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? "bg-purple-100 text-purple-700 font-medium"
                    : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* 데스크톱 사용자 메뉴 */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 text-sm">
                  안녕하세요,{" "}
                  <span className="font-medium">{user?.name || "사용자"}</span>
                  님!
                </span>
                <Link
                  to="/dashboard"
                  className={`p-2 rounded-lg transition-colors ${
                    location.pathname === "/dashboard"
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                  title="대시보드"
                >
                  <span className="text-xl">👤</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleLogin}
                  className="text-purple-600 hover:text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium"
                >
                  로그인
                </button>
                <button
                  onClick={handleRegister}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                >
                  회원가입
                </button>
              </div>
            )}
          </div>

          {/* 모바일 햄버거 메뉴 버튼 */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="메뉴 토글"
          >
            <div className="w-6 h-6 flex flex-col justify-center">
              <span
                className={`block h-0.5 w-6 bg-gray-600 transition-all ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-gray-600 mt-1 transition-all ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-gray-600 mt-1 transition-all ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2 mt-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={(e) => handleMenuClick(e, item.path)}
                  className={`flex items-center space-x-2 px-3 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? "bg-purple-100 text-purple-700 font-medium"
                      : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}

              {/* 모바일 대시보드 링크 (로그인한 경우) */}
              {isLoggedIn && (
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-3 rounded-lg transition-colors ${
                    location.pathname === "/dashboard"
                      ? "bg-purple-100 text-purple-700 font-medium"
                      : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  <span>👤</span>
                  <span>대시보드</span>
                </Link>
              )}
            </nav>

            {/* 모바일 사용자 메뉴 */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              {isLoggedIn ? (
                <div className="space-y-3">
                  <div className="px-3 py-2 text-gray-700 text-sm">
                    안녕하세요,{" "}
                    <span className="font-medium">
                      {user?.name || "사용자"}
                    </span>
                    님!
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={handleLogin}
                    className="w-full text-purple-600 border border-purple-600 px-4 py-3 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium"
                  >
                    로그인
                  </button>
                  <button
                    onClick={handleRegister}
                    className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                  >
                    회원가입
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
