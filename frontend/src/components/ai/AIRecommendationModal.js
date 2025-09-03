import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AIRecommendationModal = ({ onClose }) => {
  const [currentView, setCurrentView] = useState("main");

  // === 네비게이션 함수들 ===
  const handleAIRecommendation = () => setCurrentView("recommendation");
  const checkLoginAndBook = () => setCurrentView("booking");
  const handleHealthSystem = () => setCurrentView("health");
  const goBack = () => setCurrentView("main");

  // === 수면 분석 컴포넌트 ===
  const Analysis = () => {
    // 예시 데이터 (수면 시간)
    const data = [
      { day: "월", hours: 7.5 },
      { day: "화", hours: 8 },
      { day: "수", hours: 6.5 },
      { day: "목", hours: 7 },
      { day: "금", hours: 9 },
      { day: "토", hours: 8.5 },
      { day: "일", hours: 7.5 },
    ];

    return (
      <div className="p-8 bg-white min-h-screen">
        {/* 제목 */}
        <h2 className="text-2xl font-bold mb-2">수면 분석</h2>
        <p className="text-gray-600 mb-6">
          최근 수면 데이터를 바탕으로 개인 맞춤 분석을 제공합니다
        </p>

        {/* 분석 버튼 */}
        <button className="px-6 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition">
          분석하기
        </button>

        {/* 그리드 레이아웃 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* 수면 패턴 (그래프) */}
          <div>
            <h3 className="text-lg font-semibold mb-4">수면 패턴</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="hours" fill="#a855f7" name="수면 시간 (시간)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 수면 품질 (통계 카드) */}
          <div>
            <h3 className="text-lg font-semibold mb-4">수면 품질</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50">
                <p className="text-sm text-gray-500">평균 수면 시간</p>
                <p className="text-lg font-bold">7시간 30분</p>
              </div>
              <div className="p-4 rounded-xl bg-green-50">
                <p className="text-sm text-gray-500">수면 효율성</p>
                <p className="text-lg font-bold">88%</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50">
                <p className="text-sm text-gray-500">깊은 잠 비율</p>
                <p className="text-lg font-bold">22%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // === 운동 분석 컴포넌트 ===
  const ExerciseAnalysis = () => {
    // 주간 운동 데이터 (분 단위)
    const weeklyData = [
      { day: "월", minutes: 40 },
      { day: "화", minutes: 45 },
      { day: "수", minutes: 0 },
      { day: "목", minutes: 60 },
      { day: "금", minutes: 30 },
      { day: "토", minutes: 90 },
      { day: "일", minutes: 45 },
    ];

    // 운동 강도 분포 데이터
    const intensityData = [
      { name: "낮음", value: 3 },
      { name: "중간", value: 4 },
      { name: "높음", value: 2 },
    ];

    const COLORS = ["#4CAF50", "#FFC107", "#F44336"]; // 초록, 노랑, 빨강

    return (
      <div className="p-6 bg-white">
        <h2 className="text-2xl font-bold mb-6">운동 분석</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 주간 운동 현황 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">주간 운동 현황</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="minutes"
                  name="운동 시간 (분)"
                  stroke="#8884d8"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 오른쪽: 운동 강도 분포 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">운동 강도 분포</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={intensityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {intensityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 하단 요약 박스 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-600 mb-2">이번 주 총 운동시간</p>
            <h3 className="text-2xl font-bold text-blue-800">4시간 30분</h3>
          </div>
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <p className="text-sm text-green-600 mb-2">평균 운동 강도</p>
            <h3 className="text-2xl font-bold text-green-800">중간</h3>
          </div>
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
            <p className="text-sm text-purple-600 mb-2">목표 달성률</p>
            <h3 className="text-2xl font-bold text-purple-800">85%</h3>
          </div>
        </div>
      </div>
    );
  };

  // === 1. AI 추천 뷰 컴포넌트 ===
  const AIRecommendationView = ({ onBack }) => {
    const [showResult, setShowResult] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
      age: "20대",
      experience: "초보자",
      healthCondition: "",
      goals: "",
      availableTime: "30분",
    });

    const generateRecommendation = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      setShowResult(true);
    };

    const bookRecommendedClass = () => {
      alert("추천 수업이 예약되었습니다!");
      setCurrentView("booking");
    };

    const getRecommendation = () => {
      const recommendations = {
        "20대": {
          초보자: [
            {
              name: "아침 기초 요가",
              duration: "20분",
              description: "하루를 시작하는 기본 스트레칭과 호흡법",
              difficulty: "초급",
              benefits: ["유연성 향상", "스트레스 해소", "자세 교정"],
            },
            {
              name: "힐링 명상 요가",
              duration: "25분",
              description: "마음의 평온과 집중력 향상을 위한 프로그램",
              difficulty: "초급",
              benefits: ["명상 효과", "마음 안정", "수면 개선"],
            },
          ],
        },
      };

      return (
        recommendations[formData.age]?.[formData.experience] ||
        recommendations["20대"]["초보자"]
      );
    };

    return (
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="mr-4 text-purple-600 hover:underline flex items-center"
          >
            <span className="mr-2">←</span>홈으로 돌아가기
          </button>
          <h2 className="text-2xl font-bold">AI 맞춤 요가 추천</h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">
              건강 상태와 목표를 알려주세요
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">연령대</label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                >
                  <option>20대</option>
                  <option>30대</option>
                  <option>40대</option>
                  <option>50대 이상</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  운동 경험
                </label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                >
                  <option>초보자</option>
                  <option>중급자</option>
                  <option>고급자</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  운동 가능 시간
                </label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={formData.availableTime}
                  onChange={(e) =>
                    setFormData({ ...formData, availableTime: e.target.value })
                  }
                >
                  <option>15분</option>
                  <option>30분</option>
                  <option>45분</option>
                  <option>60분 이상</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">목표</label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={formData.goals}
                  onChange={(e) =>
                    setFormData({ ...formData, goals: e.target.value })
                  }
                >
                  <option value="">선택하세요</option>
                  <option>스트레스 해소</option>
                  <option>체력 향상</option>
                  <option>유연성 개선</option>
                  <option>다이어트</option>
                  <option>자세 교정</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={generateRecommendation}
            disabled={isLoading}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            )}
            {isLoading ? "AI가 분석 중..." : "맞춤 추천받기"}
          </button>

          {showResult && (
            <div className="mt-8 p-6 bg-purple-50 rounded-lg">
              <h4 className="font-bold text-lg mb-4 flex items-center">
                <span className="mr-2">🤖</span>
                AI 맞춤 요가 프로그램 추천
              </h4>
              <div className="space-y-4">
                {getRecommendation().map((program, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-purple-600 pl-4 bg-white p-4 rounded"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-semibold text-lg">{program.name}</h5>
                      <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs">
                        {program.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{program.description}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span className="mr-4">⏱️ {program.duration}</span>
                      <span>🎯 추천도: 95%</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {program.benefits.map((benefit, idx) => (
                        <span
                          key={idx}
                          className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={bookRecommendedClass}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex-1"
                >
                  추천 수업 예약하기
                </button>
                <button
                  onClick={() => setShowResult(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400"
                >
                  다시 추천받기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // === 2. 예약 뷰 컴포넌트 (수업별 YouTube 영상 포함) ===
  const BookingView = ({ onBack }) => {
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedDate, setSelectedDate] = useState("2025-08-21");
    const [showVideo, setShowVideo] = useState(false);

    // 실제 요가 YouTube 영상 ID로 변경
    const videoIds = {
      "아침 스트레칭 요가": "BjEq1AVRgzc", // 에일린 - 10분 모닝 요가
      "저녁 힐링 요가": "EOJa7MqnVrs", // 에일린 - 자기 전 요가
      "새벽 명상 요가": "umEJnBsHjqg", // 에일린 - 저녁 요가
      "점심 파워 요가": "ce4ecIylmvM", // 에일린 - 파워 요가
      "파워 요가": "ce4ecIylmvM", // 에일린 - 파워 요가
    };

    const classes = [
      {
        id: 1,
        name: "아침 스트레칭 요가",
        time: "09:00-09:30",
        instructor: "김*가 강사",
        description: "기본적인 스트레칭으로 하루를 시작하세요",
        level: "초급",
        participants: 8,
        maxParticipants: 12,
        price: "15,000원",
        status: "available",
        videoId: videoIds["아침 스트레칭 요가"],
        thumbnail: "https://i.ytimg.com/vi/BjEq1AVRgzc/hqdefault.jpg",
      },
      {
        id: 2,
        name: "파워 요가",
        time: "14:00-15:00",
        instructor: "박*워 강사",
        description: "체력 향상을 위한 강도 높은 요가",
        level: "중급",
        participants: 10,
        maxParticipants: 10,
        price: "20,000원",
        status: "full",
        videoId: videoIds["파워 요가"],
        thumbnail: "https://i.ytimg.com/vi/ce4ecIylmvM/hqdefault.jpg",
      },
      {
        id: 3,
        name: "저녁 힐링 요가",
        time: "19:00-20:00",
        instructor: "이*링 강사",
        description: "하루의 피로를 풀어주는 릴렉스 요가",
        level: "초급",
        participants: 6,
        maxParticipants: 15,
        price: "18,000원",
        status: "available",
        videoId: videoIds["저녁 힐링 요가"],
        thumbnail: "https://i.ytimg.com/vi/EOJa7MqnVrs/hqdefault.jpg",
      },
      {
        id: 4,
        name: "점심 파워 요가",
        time: "12:00-13:00",
        instructor: "최*력 강사",
        description: "점심시간 짧고 강한 파워 요가",
        level: "중급",
        participants: 5,
        maxParticipants: 8,
        price: "22,000원",
        status: "available",
        videoId: videoIds["점심 파워 요가"],
        thumbnail: "https://i.ytimg.com/vi/ce4ecIylmvM/hqdefault.jpg",
      },
      {
        id: 5,
        name: "새벽 명상 요가",
        time: "06:00-07:00",
        instructor: "박*상 강사",
        description: "하루를 평온하게 시작하는 명상 요가",
        level: "초급",
        participants: 3,
        maxParticipants: 10,
        price: "18,000원",
        status: "available",
        videoId: videoIds["새벽 명상 요가"],
        thumbnail: "https://i.ytimg.com/vi/umEJnBsHjqg/hqdefault.jpg",
      },
    ];

    const bookClass = (yogaClass) => {
      if (yogaClass.status === "full") {
        alert("죄송합니다. 해당 수업은 정원이 마감되었습니다.");
        return;
      }

      alert(`${yogaClass.name} (${yogaClass.time}) 수업이 예약되었습니다!`);
      setSelectedClass(yogaClass);
      setShowVideo(true);
    };

    const previewClass = (yogaClass) => {
      setSelectedClass(yogaClass);
      setShowVideo(true);
    };

    const getStatusBadge = (status) => {
      if (status === "full") {
        return (
          <span className="text-sm text-white bg-red-500 px-3 py-1 rounded-full">
            마감
          </span>
        );
      }
      return (
        <span className="text-sm text-white bg-green-500 px-3 py-1 rounded-full">
          예약가능
        </span>
      );
    };

    // VideoPlayer 컴포넌트 (큰 모달 화면)
    const VideoPlayer = ({ selectedClass, onClose }) => {
      if (!selectedClass) return null;

      return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold">{selectedClass.name}</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-4">
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${selectedClass.videoId}?autoplay=1&rel=0`}
                  title={selectedClass.name}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-gray-600">
                  <span className="font-semibold">강사:</span>{" "}
                  {selectedClass.instructor}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">시간:</span>{" "}
                  {selectedClass.time}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">레벨:</span>{" "}
                  {selectedClass.level}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">설명:</span>{" "}
                  {selectedClass.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="mr-4 text-purple-600 hover:underline flex items-center"
          >
            <span className="mr-2">←</span>홈으로 돌아가기
          </button>
          <h2 className="text-2xl font-bold">수업 예약</h2>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              수업 날짜 선택
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="p-2 border rounded-lg"
              min="2025-08-21"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* 왼쪽: 수업 목록 */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-bold mb-4">2025. 8. 21.의 수업</h3>

              <div className="grid md:grid-cols-2 gap-4">
                {classes.map((yogaClass) => (
                  <div
                    key={yogaClass.id}
                    className="bg-white rounded-lg p-5 shadow-sm border hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-lg">{yogaClass.name}</h4>
                      {getStatusBadge(yogaClass.status)}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-4">🕒 {yogaClass.time}</span>
                        <span>📊 {yogaClass.level}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-4">👨‍🏫 {yogaClass.instructor}</span>
                        <span>💰 {yogaClass.price}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 mb-4">
                      {yogaClass.description}
                    </p>

                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs text-gray-400">
                        {yogaClass.participants}/{yogaClass.maxParticipants}명
                        참여중
                      </span>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 ml-3">
                        <div
                          className="bg-purple-600 h-1.5 rounded-full"
                          style={{
                            width: `${
                              (yogaClass.participants /
                                yogaClass.maxParticipants) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => previewClass(yogaClass)}
                        className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm"
                      >
                        영상보기
                      </button>
                      <button
                        onClick={() => bookClass(yogaClass)}
                        disabled={yogaClass.status === "full"}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm ${
                          yogaClass.status === "full"
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-purple-600 text-white hover:bg-purple-700"
                        }`}
                      >
                        {yogaClass.status === "full" ? "마감" : "예약하기"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 오른쪽: 수업 영상/정보 */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-bold mb-4">수업 영상</h3>

              {selectedClass ? (
                <div className="bg-white rounded-lg p-4 shadow-sm border">
                  <h4 className="font-bold text-lg mb-4">
                    {selectedClass.name}
                  </h4>

                  {/* 수업 영상 - YouTube iframe으로 변경 */}
                  <div className="mb-4">
                    <div
                      className="relative w-full"
                      style={{ paddingBottom: "56.25%" }}
                    >
                      <iframe
                        src={`https://www.youtube.com/embed/${selectedClass.videoId}?rel=0`}
                        title={selectedClass.name}
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        frameBorder="0"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      {selectedClass.name} 수업 미리보기 영상
                    </p>
                  </div>

                  {/* 수업 상세 정보 */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">시간:</span>
                      <span className="text-sm font-medium">
                        {selectedClass.time}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">강사:</span>
                      <span className="text-sm font-medium">
                        {selectedClass.instructor}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">난이도:</span>
                      <span className="text-sm font-medium">
                        {selectedClass.level}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">가격:</span>
                      <span className="text-sm font-medium text-purple-600">
                        {selectedClass.price}
                      </span>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h5 className="font-bold text-blue-800 mb-2">
                      🎯 수업 특징
                    </h5>
                    <p className="text-sm text-blue-700">
                      {selectedClass.description}
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <h5 className="font-bold text-green-800 mb-2">
                      📋 준비사항
                    </h5>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• 요가 매트 준비</li>
                      <li>• 편안한 운동복 착용</li>
                      <li>• 수업 10분 전 입장</li>
                      <li>• 충분한 수분 준비</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg p-8 shadow-sm border text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">📺</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    수업을 선택하면 미리보기 영상을 볼 수 있습니다
                  </p>
                  <div className="text-sm text-gray-500">
                    <p>• 아침 스트레칭 요가</p>
                    <p>• 저녁 힐링 요가</p>
                    <p>• 새벽 명상 요가</p>
                    <p>• 점심 파워 요가</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 큰 비디오 플레이어 모달 */}
        {showVideo && (
          <VideoPlayer
            selectedClass={selectedClass}
            onClose={() => setShowVideo(false)}
          />
        )}
      </div>
    );
  };

  // === 3. 건강 관리 뷰 컴포넌트 ===
  const HealthSystemView = ({ onBack }) => {
    const [healthView, setHealthView] = useState("main");

    const AnalysisOptions = () => (
      <div>
        <div className="mb-8 text-center">
          <h3 className="text-xl font-semibold text-green-600 mb-4">
            건강 데이터를 분석하여 맞춤 관리를 제공합니다
          </h3>
          <p className="text-gray-600 mb-6">
            운동 기록, 수면 패턴, 건강 지표를 종합적으로 분석합니다
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <button
            onClick={() => setHealthView("comprehensive")}
            className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 text-center group transition-all"
          >
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-xl">📊</span>
            </div>
            <h4 className="font-semibold">종합적인 분석</h4>
            <p className="text-blue-100 text-sm mt-2">
              전체적인 건강 상태 분석
            </p>
          </button>
          <button
            onClick={() => setHealthView("today")}
            className="bg-green-600 text-white p-6 rounded-lg hover:bg-green-700 text-center group transition-all"
          >
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-xl">📅</span>
            </div>
            <h4 className="font-semibold">오늘</h4>
            <p className="text-green-100 text-sm mt-2">
              오늘의 운동과 건강 지표
            </p>
          </button>
          <button
            onClick={() => setHealthView("sleep")}
            className="bg-purple-600 text-white p-6 rounded-lg hover:bg-purple-700 text-center group transition-all"
          >
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-xl">🌙</span>
            </div>
            <h4 className="font-semibold">수면 분석</h4>
            <p className="text-purple-100 text-sm mt-2">
              수면 패턴과 품질 분석
            </p>
          </button>
        </div>
      </div>
    );

    // 종합적인 분석 - ExerciseAnalysis 컴포넌트를 여기에 통합
    const ComprehensiveAnalysis = () => (
      <div className="bg-white min-h-screen">
        <div className="p-6">
          <button
            onClick={() => setHealthView("main")}
            className="mb-4 text-purple-600 hover:underline flex items-center"
          >
            <span className="mr-2">←</span>건강 관리로 돌아가기
          </button>

          {/* ExerciseAnalysis 컴포넌트를 여기에 삽입 */}
          <ExerciseAnalysis />
        </div>
      </div>
    );

    // 오늘의 운동과 건강 지표
    const TodayAnalysis = () => (
      <div className="bg-white min-h-screen">
        <div className="p-6">
          <button
            onClick={() => setHealthView("main")}
            className="mb-4 text-purple-600 hover:underline flex items-center"
          >
            <span className="mr-2">←</span>건강 관리로 돌아가기
          </button>
          <h2 className="text-xl font-bold mb-6">오늘의 운동과 건강 지표</h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* 오늘의 활동 */}
              <div>
                <h3 className="text-lg font-bold mb-4">오늘의 활동</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-green-800">
                          아침 스트레칭 요가
                        </h4>
                        <p className="text-sm text-green-600">09:00 - 09:30</p>
                        <p className="text-xs text-green-500 mt-1">
                          소모 칼로리: 85kcal
                        </p>
                      </div>
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                        완료
                      </span>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-yellow-800">
                          점심 파워 요가
                        </h4>
                        <p className="text-sm text-yellow-600">12:30 - 13:30</p>
                        <p className="text-xs text-yellow-500 mt-1">
                          예상 칼로리: 150kcal
                        </p>
                      </div>
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
                        진행중
                      </span>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-blue-800">
                          저녁 힐링 요가
                        </h4>
                        <p className="text-sm text-blue-600">19:00 - 20:00</p>
                        <p className="text-xs text-blue-500 mt-1">
                          예상 칼로리: 120kcal
                        </p>
                      </div>
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                        예정
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 실시간 건강 지표 */}
              <div>
                <h3 className="text-lg font-bold mb-4">실시간 건강 지표</h3>
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">❤️</span>
                        <span className="font-medium">평균 심박수</span>
                      </div>
                      <span className="text-xl font-bold text-red-600">
                        72 bpm
                      </span>
                    </div>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">🔥</span>
                        <span className="font-medium">소모 칼로리</span>
                      </div>
                      <span className="text-xl font-bold text-orange-600">
                        245 kcal
                      </span>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">⏱️</span>
                        <span className="font-medium">총 운동 시간</span>
                      </div>
                      <span className="text-xl font-bold text-blue-600">
                        45분
                      </span>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">👣</span>
                        <span className="font-medium">걸음 수</span>
                      </div>
                      <span className="text-xl font-bold text-green-600">
                        8,420보
                      </span>
                    </div>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">💧</span>
                        <span className="font-medium">수분 섭취</span>
                      </div>
                      <span className="text-xl font-bold text-purple-600">
                        1.2L
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 목표 달성 현황 */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border">
              <h3 className="text-lg font-bold mb-4 text-gray-800">
                🎯 오늘의 목표 달성률
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>운동 시간</span>
                    <span>45/60분 (75%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>칼로리 소모</span>
                    <span>245/300kcal (82%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-600 h-3 rounded-full"
                      style={{ width: "82%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    // 수면 패턴과 품질 분석 - Analysis 컴포넌트를 여기에 통합
    const SleepAnalysis = () => {
      return (
        <div className="bg-white min-h-screen">
          <div className="p-6">
            <button
              onClick={() => setHealthView("main")}
              className="mb-4 text-purple-600 hover:underline flex items-center"
            >
              <span className="mr-2">←</span>건강 관리로 돌아가기
            </button>

            {/* Analysis 컴포넌트를 여기에 삽입 */}
            <Analysis />
          </div>
        </div>
      );
    };

    return (
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="mr-4 text-purple-600 hover:underline flex items-center"
          >
            <span className="mr-2">←</span>홈으로 돌아가기
          </button>
          <h2 className="text-2xl font-bold">건강 관리 시스템</h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {healthView === "main" && <AnalysisOptions />}
          {healthView === "comprehensive" && <ComprehensiveAnalysis />}
          {healthView === "today" && <TodayAnalysis />}
          {healthView === "sleep" && <SleepAnalysis />}
        </div>
      </div>
    );
  };

  // === 4. 메인 뷰 컴포넌트 ===
  const MainView = () => (
    <>
      <div className="p-6 text-center relative bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-2xl">
        <h1 className="text-3xl font-bold mb-2">
          🧘‍♀️ AI 맞춤 요가로 건강한 하루를
        </h1>
        <p className="text-purple-100"></p>
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-white hover:text-gray-200 text-2xl font-bold"
        >
          ×
        </button>
      </div>

      <div className="text-center mb-8 px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          당신의 아름다움은 중요합니다
        </h2>
        <p className="text-lg text-gray-600">
          건강한 라이프스타일을 시작하세요
        </p>
      </div>

      <div className="px-6 pb-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-105 border border-purple-100">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mb-4">
                <span className="text-white text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold mb-3">AI 맞춤 요가 추천</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                개인 건강 상태, 목표, 운동 경험을 분석하여 최적의 요가
                프로그램을 추천해드립니다
              </p>
              <button
                onClick={handleAIRecommendation}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all font-medium shadow-md"
              >
                맞춤 추천받기
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-105 border border-green-100">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-4">
                <span className="text-white text-2xl">📅</span>
              </div>
              <h3 className="text-xl font-bold mb-3">실시간 수업 예약</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                전문 강사와 함께하는 라이브 요가 수업을 실시간으로 예약하고
                참여하세요
              </p>
              <button
                onClick={checkLoginAndBook}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-medium shadow-md"
              >
                수업 예약하기
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-105 border border-red-100">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full mb-4">
                <span className="text-white text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-bold mb-3">건강 관리 시스템</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                운동 기록, 수면 패턴, 건강 지표를 체계적으로 분석하고 관리하세요
              </p>
              <button
                onClick={handleHealthSystem}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all font-medium shadow-md"
              >
                건강 분석 시작
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // === 메인 렌더링 ===
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-50 rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {currentView === "main" && <MainView />}
        {currentView === "recommendation" && (
          <AIRecommendationView onBack={goBack} />
        )}
        {currentView === "booking" && <BookingView onBack={goBack} />}
        {currentView === "health" && <HealthSystemView onBack={goBack} />}
      </div>
    </div>
  );
};

export default AIRecommendationModal;
