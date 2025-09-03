import React from "react";
import { useApp } from "../components/contexts/AppContext";

const DashboardPage = () => {
  const { user, isLoggedIn } = useApp();

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          로그인이 필요합니다
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          마이페이지를 이용하려면 로그인해주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">마이페이지</h1>
        <p className="text-xl text-gray-600">
          안녕하세요, {user?.name || "사용자"}님! 👋
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">📊 내 수업 현황</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>이번 주 수업</span>
                <span className="font-semibold">3회</span>
              </div>
              <div className="flex justify-between">
                <span>이번 달 수업</span>
                <span className="font-semibold">12회</span>
              </div>
              <div className="flex justify-between">
                <span>누적 수업</span>
                <span className="font-semibold">48회</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">💪 건강 통계</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>체중 변화</span>
                <span className="font-semibold text-green-600">-2.5kg</span>
              </div>
              <div className="flex justify-between">
                <span>유연성 점수</span>
                <span className="font-semibold">85/100</span>
              </div>
              <div className="flex justify-between">
                <span>스트레스 수준</span>
                <span className="font-semibold text-blue-600">낮음</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
