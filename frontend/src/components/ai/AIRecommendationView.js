import React, { useState, useEffect, useRef } from "react";

import AIRecommendationView from "./AIRecommendationView";
import BookingView from "./BookingView";
import HealthSystemView from "./HealthSystemView";

const AIRecommendationModal = ({ onClose }) => {
  const [currentView, setCurrentView] = useState("main");

  const handleAIRecommendation = () => {
    setCurrentView("recommendation");
  };

  const checkLoginAndBook = () => {
    setCurrentView("booking");
  };

  const handleHealthSystem = () => {
    setCurrentView("health");
  };

  const goBack = () => {
    setCurrentView("main");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {currentView === "main" && (
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                AI 의료 서비스
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                className="bg-blue-50 p-6 rounded-xl cursor-pointer hover:bg-blue-100 transition-colors"
                onClick={handleAIRecommendation}
              >
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-lg font-semibold mb-2">AI 추천</h3>
                <p className="text-gray-600 text-sm">
                  AI가 분석한 맞춤형 의료 추천을 받아보세요
                </p>
              </div>

              <div
                className="bg-green-50 p-6 rounded-xl cursor-pointer hover:bg-green-100 transition-colors"
                onClick={checkLoginAndBook}
              >
                <div className="text-4xl mb-4">📅</div>
                <h3 className="text-lg font-semibold mb-2">예약하기</h3>
                <p className="text-gray-600 text-sm">
                  간편하게 병원 예약을 진행하세요
                </p>
              </div>

              <div
                className="bg-purple-50 p-6 rounded-xl cursor-pointer hover:bg-purple-100 transition-colors"
                onClick={handleHealthSystem}
              >
                <div className="text-4xl mb-4">🏥</div>
                <h3 className="text-lg font-semibold mb-2">건강 관리</h3>
                <p className="text-gray-600 text-sm">
                  종합적인 건강 상태를 확인하고 관리하세요
                </p>
              </div>
            </div>
          </div>
        )}
        {currentView === "recommendation" && (
          <AIRecommendationView onClose={onClose} onBack={goBack} />
        )}
        {currentView === "booking" && (
          <BookingView onClose={onClose} onBack={goBack} />
        )}
        {currentView === "health" && (
          <HealthSystemView onClose={onClose} onBack={goBack} />
        )}
      </div>
    </div>
  );
};

export default AIRecommendationModal;
