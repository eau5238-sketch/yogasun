import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookingPage = () => {
  const navigate = useNavigate();

  // 로그인 상태와 예약된 수업 상태 관리
  const loginData = localStorage.getItem("user");
  const [isLoggedIn, setIsLoggedIn] = useState(!!loginData);
  const [bookedClass, setBookedClass] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  const classes = [
    {
      id: 1,
      name: "아침 스트레칭 요가",
      time: "09:00 - 09:30",
      instructor: "김*가",
      level: "beginner",
      spots: "12/15",
      description: "하루를 상쾌하게 시작하는 부드러운 스트레칭",
      bgGradient: "from-purple-400 to-pink-400",
      videoId: "Hv5dNa_JqFs", // YouTube 영상 ID
      videoTitle: "아침 스트레칭 요가 - 기본 동작",
    },
    {
      id: 2,
      name: "파워 요가",
      time: "14:00 - 15:00",
      instructor: "이*워",
      level: "intermediate",
      spots: "8/12",
      description: "체력 향상과 근력 강화를 위한 역동적인 요가",
      bgGradient: "from-green-400 to-blue-400",
      videoId: "g_tea8ZNk5A", // YouTube 영상 ID (예시)
      videoTitle: "파워 요가 - 근력 강화 동작",
    },
    {
      id: 3,
      name: "명상 요가",
      time: "19:00 - 20:00",
      instructor: "박*상",
      level: "beginner",
      spots: "5/10",
      description: "마음의 평화와 안정을 찾는 치유의 시간",
      bgGradient: "from-yellow-400 to-orange-400",
      videoId: "UfcIOB9bs9E", // YouTube 영상 ID (예시)
      videoTitle: "명상 요가 - 마음의 평화",
    },
  ];

  // 레벨별 배지 컴포넌트
  const LevelBadge = ({ level }) => {
    const getLevelInfo = (level) => {
      const levels = {
        beginner: { name: "초급", color: "bg-green-100 text-green-800" },
        intermediate: { name: "중급", color: "bg-yellow-100 text-yellow-800" },
        advanced: { name: "고급", color: "bg-red-100 text-red-800" },
        all: { name: "모든레벨", color: "bg-blue-100 text-blue-800" },
      };
      return levels[level] || levels.beginner;
    };

    const levelInfo = getLevelInfo(level);
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${levelInfo.color}`}
      >
        {levelInfo.name}
      </span>
    );
  };

  // 예약하기 버튼 클릭 핸들러
  const handleBookClass = (classItem) => {
    console.log("예약 버튼 클릭됨:", classItem.name); // 디버깅용

    if (!isLoggedIn) {
      // 로그인되지 않은 경우
      alert("수업 예약을 위해서는 로그인이 필요합니다.");
      // 선택한 수업 정보를 localStorage에 저장 (로그인 후 다시 사용하기 위해)
      localStorage.setItem("selectedClass", JSON.stringify(classItem));
      navigate("/login");
    } else {
      // 로그인된 경우 바로 예약 처리
      processBooking(classItem);
    }
  };

  // 예약 처리 함수
  const processBooking = (classItem) => {
    setBookedClass(classItem);
    alert(`${classItem.name} (${classItem.time}) 수업이 예약되었습니다!`);
    setShowVideo(true);
  };

  // 영상 닫기
  const closeVideo = () => {
    setShowVideo(false);
    setBookedClass(null);
  };

  // 로그인 상태 체크 (페이지가 로드될 때마다)
  useEffect(() => {
    const checkLogin = () => {
      const loginData = localStorage.getItem("user");
      if (loginData) {
        setIsLoggedIn(true);

        // 로그인 후 이전에 선택한 수업이 있는지 확인
        const selectedClass = localStorage.getItem("selectedClass");
        if (selectedClass) {
          const classData = JSON.parse(selectedClass);
          processBooking(classData);
          localStorage.removeItem("selectedClass"); // 사용 후 제거
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  }, []);

  // 로그인되지 않은 경우 (하지만 BookingPage에 직접 접근한 경우)
  if (!isLoggedIn && !localStorage.getItem("selectedClass")) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-6">
            <div className="text-6xl text-gray-400 mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              로그인이 필요합니다
            </h2>
            <p className="text-gray-600">
              수업 예약을 위해 먼저 로그인해주세요.
            </p>
          </div>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-200"
            >
              로그인하기
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              홈으로 가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 메인 컨텐츠 렌더링
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen bg-gray-50">
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-purple-600 hover:underline flex items-center"
      >
        <span className="mr-2">←</span>홈으로 돌아가기
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">🧘‍♀️ 수업 예약</h2>
          <p className="text-gray-600">
            원하는 요가 수업을 선택하고 예약해보세요.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border hover:shadow-xl transition-shadow duration-300"
            >
              <div
                className={`h-48 bg-gradient-to-r ${classItem.bgGradient}`}
              ></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {classItem.name}
                  </h3>
                  <LevelBadge level={classItem.level} />
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  {classItem.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2 text-purple-600">🕐</span>
                    <span className="font-semibold">시간:</span>
                    <span className="ml-1">{classItem.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="mr-2 text-purple-600">👨‍🏫</span>
                    <span className="font-semibold">강사:</span>
                    <span className="ml-1">{classItem.instructor}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="mr-2 text-purple-600">👥</span>
                    <span className="font-semibold text-gray-700">예약:</span>
                    <span className="ml-1 text-blue-600 font-semibold">
                      {classItem.spots}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleBookClass(classItem)}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition duration-200 font-semibold flex items-center justify-center cursor-pointer"
                  type="button"
                >
                  <span className="mr-2">📅</span>
                  예약하기
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">
              📢 예약 안내
            </h3>
            <div className="text-sm text-purple-700 space-y-1">
              <p>• 수업 시작 24시간 전까지 무료 취소 가능합니다.</p>
              <p>• 수업 정원이 찰 경우 대기자 명단에 등록됩니다.</p>
              <p>• 수업 관련 문의사항은 고객센터로 연락해주세요.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 비디오 플레이어 모달 */}
      {showVideo && bookedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  {bookedClass.name} - 수업 영상
                </h3>
                <button
                  onClick={closeVideo}
                  className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="mb-4">
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${bookedClass.videoId}?autoplay=1`}
                    title={bookedClass.videoTitle}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-2">
                      수업 정보
                    </h4>
                    <p>
                      <strong>수업명:</strong> {bookedClass.name}
                    </p>
                    <p>
                      <strong>시간:</strong> {bookedClass.time}
                    </p>
                    <p>
                      <strong>강사:</strong> {bookedClass.instructor}
                    </p>
                    <p>
                      <strong>난이도:</strong>{" "}
                      <LevelBadge level={bookedClass.level} />
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-2">
                      수업 설명
                    </h4>
                    <p className="text-gray-700">{bookedClass.description}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={closeVideo}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-200"
                >
                  수업 완료
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
