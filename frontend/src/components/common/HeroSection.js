import React from "react";
import { useApp } from "../contexts/AppContext";

const HeroSection = ({ handleShowAIModal, setShowRegister }) => {
  const { isLoggedIn } = useApp();

  const handleAIClick = () => {
    if (!isLoggedIn) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }
    handleShowAIModal();
  };

  const handleClassesClick = () => {
    if (!isLoggedIn) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }
    // 수업 페이지로 이동
    window.location.href = "/classes";
  };

  return (
    <section
      className="hero-section min-h-screen flex items-center justify-center py-20 px-4 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.2)), url('https://page.gensparksite.com/v1/base64_upload/bad2baa990974f6c099135e2ed649e7b')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight drop-shadow-lg">
            마음과 몸이 하나 되는
            <br />
            개인 맞춤 요가 ✨
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 drop-shadow-md">
            AI 추천 시스템으로 나만의 완벽한 요가를 찾아보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isLoggedIn ? (
              <button
                onClick={() => alert("로그인을 신청하세요")}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 shadow-lg cursor-not-allowed"
              >
                🔒 로그인을 신청하세요
              </button>
            ) : (
              <>
                <button
                  onClick={handleAIClick}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <i className="fas fa-robot mr-2"></i>
                  AI 맞춤 요가 추천받기
                </button>
                <button
                  onClick={handleClassesClick}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  🧘‍♀️ 요가수업보기
                </button>
              </>
            )}
            <button
              onClick={() => setShowRegister(true)}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              무료 회원가입
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
