import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";

const MainHomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // 로그인 상태 체크
  useEffect(() => {
    const checkLoginStatus = () => {
      const loginData = localStorage.getItem("user");
      if (loginData) {
        try {
          const userData = JSON.parse(loginData);
          setIsLoggedIn(true);
          setCurrentUser(userData.username || userData.email?.split("@")[0]);
        } catch (error) {
          console.error("로그인 정보 파싱 오류:", error);
        }
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setCurrentUser(null);
    alert("로그아웃되었습니다.");
  };

  const checkLoginAndBook = () => {
    if (!isLoggedIn) {
      alert("수업 예약을 위해서는 로그인이 필요합니다.");
      navigate("/login");
    } else {
      navigate("/booking");
    }
  };

  const handleAIRecommendation = () => {
    navigate("/ai-recommendation");
  };

  const handleHealthSystem = () => {
    navigate("/health-system");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* 홈 화면 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            AI 맞춤 요가 건강한 하루
          </h2>
          <p className="text-xl text-gray-600">
            개인 맞춤형 요가 추천부터 전문 강사 수업까지
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* AI 맞춤 요가 추천 */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <i className="fas fa-robot text-4xl text-purple-600 mb-4"></i>
              <h3 className="text-xl font-bold mb-3">AI 맞춤 요가 추천</h3>
              <p className="text-gray-600 mb-6">
                개인 건강 상태에 맞는 요가 프로그램을 AI가 추천해드립니다
              </p>
              <button
                onClick={handleAIRecommendation}
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
              >
                추천받기
              </button>
            </div>
          </div>

          {/* 실시간 수업 예약 */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <i className="fas fa-calendar-alt text-4xl text-green-600 mb-4"></i>
              <h3 className="text-xl font-bold mb-3">실시간 수업 예약</h3>
              <p className="text-gray-600 mb-6">
                전문 강사와 함께하는 라이브 요가 수업을 예약하세요
              </p>
              <button
                onClick={checkLoginAndBook}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
              >
                수업 예약하기
              </button>
            </div>
          </div>

          {/* 건강 관리 시스템 */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <i className="fas fa-heart text-4xl text-red-600 mb-4"></i>
              <h3 className="text-xl font-bold mb-3">건강 관리 시스템</h3>
              <p className="text-gray-600 mb-6">
                운동 기록과 건강 데이터를 체계적으로 관리하세요
              </p>
              <button
                onClick={handleHealthSystem}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
              >
                시작하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHomePage;
