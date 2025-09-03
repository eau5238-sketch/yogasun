import React, { useState, useEffect } from "react"; // useEffect 포함
import { useNavigate } from "react-router-dom";
const AIRecommendationPage = () => {
  const navigate = useNavigate();
  const [showResult, setShowResult] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    experience: "",
    goal: "",
    time: "",
    intensity: "",
  });
  const [recommendation, setRecommendation] = useState(null);

  // 로그인 상태 체크
  useEffect(() => {
    const checkLoginStatus = () => {
      const loginData = localStorage.getItem("user");
      if (loginData) {
        try {
          const userData = JSON.parse(loginData);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("로그인 정보 파싱 오류:", error);
        }
      }
    };
    checkLoginStatus();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // AI 추천 생성 함수
  const generateRecommendation = () => {
    if (
      !formData.experience ||
      !formData.goal ||
      !formData.time ||
      !formData.intensity
    ) {
      alert("모든 항목을 선택해주세요.");
      return;
    }

    // 추천 로직
    const recommendations = {
      flexibility: {
        name: "아침 스트레칭 요가",
        time: "09:00 - 09:30",
        instructor: "김*가",
        level: "초급",
        reason:
          "유연성 향상에 최적화된 부드러운 스트레칭으로 하루를 시작할 수 있습니다.",
      },
      strength: {
        name: "파워 요가",
        time: "14:00 - 15:00",
        instructor: "이*워",
        level: "중급",
        reason: "근력 강화와 체력 향상에 완벽한 역동적인 요가 수업입니다.",
      },
      relaxation: {
        name: "명상 요가",
        time: "19:00 - 20:00",
        instructor: "박*상",
        level: "초급",
        reason: "스트레스 해소와 마음의 평화를 찾기에 이상적인 수업입니다.",
      },
      weight: {
        name: "파워 요가",
        time: "14:00 - 15:00",
        instructor: "이*워",
        level: "중급",
        reason: "체중 감량과 체형 관리에 효과적인 고강도 요가 수업입니다.",
      },
    };

    const selectedRecommendation =
      recommendations[formData.goal] || recommendations.flexibility;
    setRecommendation(selectedRecommendation);
    setShowResult(true);
  };

  const bookRecommendedClass = () => {
    if (!isLoggedIn) {
      alert("수업 예약을 위해서는 로그인이 필요습니다.");
      navigate("/login");
    } else {
      alert("추천 수업이 예약되었습니다!");
      navigate("/booking");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const resetRecommendation = () => {
    setShowResult(false);
    setRecommendation(null);
    setFormData({ experience: "", goal: "", time: "", intensity: "" });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen bg-gray-50">
      <button
        onClick={handleBack}
        className="mb-4 text-purple-600 hover:underline flex items-center"
      >
        <i className="fas fa-arrow-left mr-2"></i>홈으로 돌아가기
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">🤖 AI 맞춤 추천</h2>

        {!showResult ? (
          <div className="grid md:grid-cols-2 gap-8">
            {/* 폼 섹션 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">개인 정보 입력</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    요가 경험 *
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">선택해주세요</option>
                    <option value="beginner">초보자 (0-6개월)</option>
                    <option value="intermediate">중급자 (6개월-2년)</option>
                    <option value="advanced">고급자 (2년 이상)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    목표 *
                  </label>
                  <select
                    name="goal"
                    value={formData.goal}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">선택해주세요</option>
                    <option value="flexibility">유연성 향상</option>
                    <option value="strength">근력 강화</option>
                    <option value="relaxation">스트레스 해소</option>
                    <option value="weight">체중 감량</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    선호 시간대 *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">선택해주세요</option>
                    <option value="morning">아침 (6-10시)</option>
                    <option value="afternoon">오후 (12-16시)</option>
                    <option value="evening">저녁 (18-22시)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    선호 강도 *
                  </label>
                  <select
                    name="intensity"
                    value={formData.intensity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">선택해주세요</option>
                    <option value="gentle">부드러운</option>
                    <option value="moderate">보통</option>
                    <option value="intense">강한</option>
                  </select>
                </div>

                <button
                  onClick={generateRecommendation}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition duration-200 mt-6"
                >
                  AI 추천 받기
                </button>
              </div>
            </div>

            {/* 정보 섹션 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">AI 추천 시스템</h3>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-purple-800 mb-4">
                  🎯 개인 맞춤 분석
                </h4>
                <p className="text-gray-700 mb-4">
                  입력하신 정보를 바탕으로 가장 적합한 요가 수업을
                  추천해드립니다.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>✓ 개인 수준에 맞는 난이도 매칭</li>
                  <li>✓ 목표에 최적화된 수업 스타일</li>
                  <li>✓ 선호 시간대 고려한 스케줄링</li>
                  <li>✓ 강도 조절 가능한 맞춤 프로그램</li>
                  <li>✓ 전문 강사진의 체계적 지도</li>
                </ul>

                <div className="mt-6 p-4 bg-white rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">
                    📊 분석 과정
                  </h5>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>• 경험 수준 → 적정 난이도 결정</p>
                    <p>• 운동 목표 → 수업 유형 선택</p>
                    <p>• 선호 시간 → 최적 스케줄 매칭</p>
                    <p>• 강도 선호 → 개인 맞춤 조절</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // 추천 결과 섹션
          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-6 text-center">
              🎉 AI 추천 결과
            </h3>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-200">
              <h4 className="text-2xl font-bold text-purple-800 mb-6 text-center">
                당신에게 딱 맞는 수업을 찾았어요!
              </h4>

              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">
                      추천 수업:
                    </span>
                    <span className="text-lg font-bold text-purple-600">
                      {recommendation?.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">시간:</span>
                    <span className="text-purple-600">
                      {recommendation?.time}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">강사:</span>
                    <span className="text-purple-600">
                      {recommendation?.instructor}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">난이도:</span>
                    <span className="text-purple-600">
                      {recommendation?.level}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-100 p-4 rounded-lg mb-6">
                <h5 className="font-semibold text-purple-800 mb-2">
                  💡 추천 이유
                </h5>
                <p className="text-purple-700">{recommendation?.reason}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={bookRecommendedClass}
                  className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition duration-200 font-semibold"
                >
                  🎯 이 수업 예약하기
                </button>
                <button
                  onClick={resetRecommendation}
                  className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition duration-200"
                >
                  🔄 다시 추천받기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIRecommendationPage;
