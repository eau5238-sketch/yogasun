import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// SleepAnalysis 컴포넌트를 HealthSystemPage 컴포넌트 외부에 별도로 선언
const SleepAnalysis = () => {
  const [currentView, setCurrentView] = useState("main");
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">수면 분석</h2>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">수면 패턴 분석하기</h3>
        <p className="text-gray-600 mb-6">
          최근 수면 데이터를 바탕으로 개인 맞춤 분석을 제공합니다
        </p>
        <button
          onClick={() => setShowResults(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
        >
          분석하기
        </button>
      </div>
      {showResults && (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">수면 패턴</h3>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">수면 차트 영역</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">수면 품질</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-600">평균 수면 시간</h4>
                <p className="text-xl font-bold">7시간 30분</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-600">수면 효율성</h4>
                <p className="text-xl font-bold">88%</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-600">깊은 잠 비율</h4>
                <p className="text-xl font-bold">22%</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const HealthSystemPage = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("main");

  const handleBack = () => {
    navigate("/");
  };

  const showGeneralAnalysis = () => {
    setCurrentView("general");
  };

  const showTodayAnalysis = () => {
    setCurrentView("today");
  };

  const showSleepAnalysis = () => {
    setCurrentView("sleep");
  };

  const backToMain = () => {
    setCurrentView("main");
  };

  // 메인 건강 관리 화면
  const renderMainView = () => (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">건강 관리 시스템</h2>
      <div className="mb-8 text-center">
        <h3 className="text-xl font-semibold text-green-600 mb-4">
          요가 수업을 시작하겠습니다
        </h3>
        <p className="text-gray-600 mb-6">
          건강 데이터를 분석하여 맞춤 관리를 제공합니다
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <button
          onClick={showGeneralAnalysis}
          className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 text-center"
        >
          <i className="fas fa-chart-line text-2xl mb-3"></i>
          <h4 className="font-semibold">일반적인 분석 보기</h4>
        </button>
        <button
          onClick={showTodayAnalysis}
          className="bg-green-600 text-white p-6 rounded-lg hover:bg-green-700 text-center"
        >
          <i className="fas fa-calendar-day text-2xl mb-3"></i>
          <h4 className="font-semibold">오늘</h4>
        </button>
        <button
          onClick={showSleepAnalysis}
          className="bg-purple-600 text-white p-6 rounded-lg hover:bg-purple-700 text-center"
        >
          <i className="fas fa-moon text-2xl mb-3"></i>
          <h4 className="font-semibold">수면 분석</h4>
        </button>
      </div>
    </div>
  );

  // 일반 분석 화면
  const renderGeneralAnalysis = () => (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">일반적인 분석</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">주간 운동 현황</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">차트 영역 (Chart.js 구현 필요)</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">운동 강도 분포</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">차트 영역 (Chart.js 구현 필요)</p>
          </div>
        </div>
      </div>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-600">이번 주 총 운동시간</h4>
          <p className="text-2xl font-bold text-blue-800">4시간 30분</p>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <h4 className="font-semibold text-green-600">평균 운동 강도</h4>
          <p className="text-2xl font-bold text-green-800">중간</p>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <h4 className="font-semibold text-purple-600">목표 달성률</h4>
          <p className="text-2xl font-bold text-purple-800">85%</p>
        </div>
      </div>
    </div>
  );

  // 오늘 분석 화면
  const renderTodayAnalysis = () => (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">오늘의 분석</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">오늘의 활동</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">아침 스트레칭</h4>
                <p className="text-gray-600">09:00 - 09:30</p>
              </div>
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                완료
              </span>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">점심 요가</h4>
                <p className="text-gray-600">12:30 - 13:00</p>
              </div>
              <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
                예정
              </span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">건강 지표</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>심박수</span>
              <span className="font-semibold">72 bpm</span>
            </div>
            <div className="flex justify-between items-center">
              <span>칼로리 소모</span>
              <span className="font-semibold">245 kcal</span>
            </div>
            <div className="flex justify-between items-center">
              <span>운동 시간</span>
              <span className="font-semibold">45분</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen bg-gray-50">
      <button
        onClick={currentView === "main" ? handleBack : backToMain}
        className="mb-4 text-purple-600 hover:underline flex items-center"
      >
        <i className="fas fa-arrow-left mr-2"></i>
        {currentView === "main" ? "홈으로 돌아가기" : "건강 관리로 돌아가기"}
      </button>

      {currentView === "main" && renderMainView()}
      {currentView === "general" && renderGeneralAnalysis()}
      {currentView === "today" && renderTodayAnalysis()}
      {currentView === "sleep" && <SleepAnalysis />}
    </div>
  );
};

export default HealthSystemPage;
