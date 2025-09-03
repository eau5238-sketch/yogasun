import React, { useState, useEffect } from "react";
import "./ClassesPage.css";

// 수업 데이터
const classes = [
  {
    id: 1,
    title: "아침을 여는 모닝 요가",
    instructor: "에린",
    duration: "10",
    level: "beginner",
    videoId: "BjEq1AVRgzc",
    description: "아침에 눈뜨자마자 침대에서 하는 10분 모닝 요가 루틴",
    thumbnail: "https://i.ytimg.com/vi/BjEq1AVRgzc/hqdefault.jpg",
    hasVideo: true,
  },
  {
    id: 2,
    title: "파워 요가 - 전신 근력 강화",
    instructor: "에린",
    duration: "25",
    level: "intermediate",
    videoId: "ce4ecIylmvM",
    description: "땀범벅 힘들지만 뿌듯한 25분 파워요가",
    thumbnail: "https://i.ytimg.com/vi/ce4ecIylmvM/hqdefault.jpg",
    hasVideo: true,
  },
  {
    id: 3,
    title: "편안한 저녁 요가",
    instructor: "에린",
    duration: "20",
    level: "beginner",
    videoId: "umEJnBsHjqg",
    description: "저녁에 하기 좋은 20분 요가, 자기전 스트레칭",
    thumbnail: "https://i.ytimg.com/vi/umEJnBsHjqg/hqdefault.jpg",
    hasVideo: true,
  },
  {
    id: 4,
    title: "10분 매일 해야하는 전신 요가 스트레칭",
    instructor: "크라우",
    duration: "10",
    level: "beginner",
    videoId: "eTuWJbdqHMc",
    description:
      "매일 해주어야 하는 전신 스트레칭. 굳은 몸을 구석구석 풀어주는 10분 스트레칭",
    thumbnail: "https://i.ytimg.com/vi/eTuWJbdqHMc/hqdefault.jpg",
    hasVideo: true,
  },
  {
    id: 5,
    title: "전신 스트레칭 데일리 요가 루틴",
    instructor: "크라우",
    duration: "13",
    level: "beginner",
    videoId: "BDHzMbaTmvw",
    description:
      "온 몸의 붓기와 독소를 싹 빼주는 전신 요가 스트레칭. 아침 요가로 좋아요",
    thumbnail: "https://i.ytimg.com/vi/BDHzMbaTmvw/hqdefault.jpg",
    hasVideo: true,
  },
  {
    id: 6,
    title: "10분 전신 모닝 요가 스트레칭",
    instructor: "크라우",
    duration: "12",
    level: "beginner",
    videoId: "RiaDnf0tb0c",
    description: "아침에 하기 좋은 10분 전신 모닝요가 스트레칭",
    thumbnail: "https://i.ytimg.com/vi/RiaDnf0tb0c/hqdefault.jpg",
    hasVideo: true,
  },
  {
    id: 7,
    title: "자기 전에 하면 딱 좋은 요가",
    instructor: "에린",
    duration: "15",
    level: "beginner",
    videoId: "EOJa7MqnVrs",
    description:
      "자기 전 몸과 마음을 편안하게 이완하는 요가 스트레칭과 호흡 명상",
    thumbnail: "https://i.ytimg.com/vi/EOJa7MqnVrs/hqdefault.jpg",
    hasVideo: true,
  },
  {
    id: 8,
    title: "누워서 전신을 풀어주는 요가",
    instructor: "에린",
    duration: "21",
    level: "beginner",
    videoId: "bLHGYOXpgO8",
    description:
      "운동하기 귀찮은 날, 누워서 할 수 있는 요가. 전신을 시원하게 풀어주는 효과 좋은 스트레칭",
    thumbnail: "https://i.ytimg.com/vi/bLHGYOXpgO8/hqdefault.jpg",
    hasVideo: true,
  },
  // 중급영상추가
  {
    id: 9,
    title: "45분 양요가 + 인요가 시퀀스",
    instructor: "에린",
    duration: "49",
    level: "intermediate",
    videoId: "eDUxGR6VwLg",
    description:
      "몸과 마음의 균형을 위한 45분 인양요가 시퀀스. 역동적인 양요가 + 차분한 인요가",
    thumbnail: "https://i.ytimg.com/vi/eDUxGR6VwLg/hqdefault.jpg",
    hasVideo: true,
  },
  {
    id: 10,
    title: "16분 구석구석 전신 스트레칭",
    instructor: "려경",
    duration: "17",
    level: "beginner",
    videoId: "hSW2yuvtPmM",
    description:
      "유연성 없이도 할 수 있는 전신순환요가로 데일리루틴으로 반복하기 좋아요",
    thumbnail: "https://i.ytimg.com/vi/hSW2yuvtPmM/hqdefault.jpg",
    hasVideo: true,
  },
  {
    id: 11,
    title: "25분 굿나잇 하타요가",
    instructor: "려경",
    duration: "26",
    level: "beginner",
    videoId: "M4VhsdgflHM",
    description:
      "잠들기 전, 숙면을 도와주는 가벼운 명상과 동작들로 차분히 움직여봐요",
    thumbnail: "https://i.ytimg.com/vi/M4VhsdgflHM/hqdefault.jpg",
    hasVideo: true,
  },
  {
    id: 12,
    title: "45분 하타요가 - 가슴열기 & 호흡",
    instructor: "려경",
    duration: "47",
    level: "intermediate",
    videoId: "gAkiDgiLGbI",
    description:
      "초중급을 위한 하타요가. 45분동안 부담없이 움직이며 한동작한동작 섬세하게",
    thumbnail: "https://i.ytimg.com/vi/gAkiDgiLGbI/hqdefault.jpg",
    hasVideo: true,
  },

  // 고급 영상 추가
  {
    id: 16,
    title: "60분 전신 스트레칭 & 근력운동 요가",
    instructor: "*스",
    duration: "58",
    level: "advanced",
    videoId: "MI8VrVKuZTY",
    videoUrl: "https://www.youtube.com/watch?v=MI8VrVKuZTY",
    description:
      "전신스트레칭과 근력운동을 한번에. 온라인 요가원! 자세한 설명과 함께 호흡하며",
    thumbnail: "https://i.ytimg.com/vi/MI8VrVKuZTY/hqdefault.jpg",
    hasVideo: true,
  },
  // 요가 명상 음악 영상들
  {
    id: 17,
    title: "10분 요가 명상 음악 - 마음의 평화",
    instructor: "명상*음악",
    duration: "10",
    level: "meditation",
    videoId: "jfKfPfyJRdk",
    videoUrl: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
    description:
      "요가 수련 후 마음을 진정시키는 10분 명상 음악. 깊은 이완과 평온함을 경험하세요",
    thumbnail: "https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg",
    hasVideo: true,
  },
  {
    id: 18,
    title: "15분 요가 명상 음악 - 호흡과 함께",
    instructor: "명상*음악",
    duration: "15",
    level: "meditation",
    videoId: "lFcSrYw-ARY",
    videoUrl: "https://www.youtube.com/watch?v=lFcSrYw-ARY",
    description:
      "호흡에 집중하며 마음을 가라앉히는 15분 요가 명상 음악. 스트레스 해소에 효과적",
    thumbnail: "https://i.ytimg.com/vi/lFcSrYw-ARY/hqdefault.jpg",
    hasVideo: true,
  },
  {
    id: 19,
    title: "20분 요가 명상 음악 - 깊은 이완",
    instructor: "명상*음악",
    duration: "20",
    level: "meditation",
    videoId: "inpok4MKVLM",
    videoUrl: "https://www.youtube.com/vi/inpok4MKVLM",
    description:
      "완전한 이완을 위한 20분 요가 명상 음악. 긴장을 풀고 내면의 평화를 찾아보세요",
    thumbnail: "https://i.ytimg.com/vi/inpok4MKVLM/hqdefault.jpg",
    hasVideo: true,
  },
  {
    id: 22,
    title: "14분 요가 명상 음악 - 스트레스 해소",
    instructor: "명상*음악",
    duration: "14",
    level: "meditation",
    videoId: "q76bMs-NwRk",
    videoUrl: "https://www.youtube.com/watch?v=q76bMs-NwRk",
    description:
      "스트레스와 긴장을 해소하는 14분 요가 명상 음악. 마음을 가볍게 만들어보세요",
    thumbnail: "https://i.ytimg.com/vi/q76bMs-NwRk/hqdefault.jpg",
    hasVideo: true,
  },
];

const ClassesPage = () => {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [isLoggedIn] = useState(true); // 로그인 상태
  const [isLoading, setIsLoading] = useState(true);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);

  // 페이지 로드 시 로딩 상태 관리
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeVideo();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // 비디오 모달이 열릴 때 YouTube iframe src를 업데이트하고, 닫힐 때 초기화
  useEffect(() => {
    const iframe = document.getElementById("youtube-player");
    if (iframe) {
      if (videoModalOpen && currentVideoId) {
        // 올바른 YouTube embed URL 형식으로 수정
        iframe.src = `https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0`;
      } else {
        iframe.src = "";
      }
    }
  }, [videoModalOpen, currentVideoId]);

  // 영상 재생 함수
  const handleWatchVideo = (videoId) => {
    if (!isLoggedIn) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }
    setCurrentVideoId(videoId);
    setVideoModalOpen(true);
  };

  // 영상 모달 닫기 함수
  const closeVideo = () => {
    setVideoModalOpen(false);
    setCurrentVideoId(null);
  };

  // 난이도별 색상 반환
  const getDifficultyColor = (level) => {
    switch (level) {
      case "beginner":
        return "text-green-600 bg-green-100";
      case "intermediate":
        return "text-yellow-600 bg-yellow-100";
      case "advanced":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // 난이도 텍스트 변환
  const getLevelText = (level) => {
    switch (level) {
      case "beginner":
        return "초급";
      case "intermediate":
        return "중급";
      case "advanced":
        return "고급";
      default:
        return level;
    }
  };

  // 필터링된 클래스 목록
  const filteredClasses =
    currentFilter === "all"
      ? classes
      : classes.filter((classItem) => classItem.level === currentFilter);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          {/* Font Awesome 아이콘을 위한 클래스 */}
          <i className="fas fa-spinner fa-spin text-4xl text-green-500 mb-4"></i>
          <p className="text-gray-600">수업 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 font-sans text-gray-800">
      {/* 비디오 모달 */}
      <div
        id="videoModal"
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 ${
          videoModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeVideo}
      >
        <div
          className="relative w-full max-w-6xl p-4 transition-transform duration-300 transform"
          style={{ aspectRatio: "16/9" }}
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            id="youtube-player"
            className="w-full h-full rounded-xl shadow-lg"
            src=""
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Yoga Video"
          ></iframe>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* 필터 버튼 */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setCurrentFilter("all")}
            className={`px-6 py-3 rounded-full transition-colors font-medium ${
              currentFilter === "all"
                ? "bg-green-500 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-green-50 border-2 border-gray-200"
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setCurrentFilter("beginner")}
            className={`px-6 py-3 rounded-full transition-colors font-medium ${
              currentFilter === "beginner"
                ? "bg-green-500 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-green-50 border-2 border-gray-200"
            }`}
          >
            초급
          </button>
          <button
            onClick={() => setCurrentFilter("intermediate")}
            className={`px-6 py-3 rounded-full transition-colors font-medium ${
              currentFilter === "intermediate"
                ? "bg-green-500 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-green-50 border-2 border-gray-200"
            }`}
          >
            중급
          </button>
          <button
            onClick={() => setCurrentFilter("advanced")}
            className={`px-6 py-3 rounded-full transition-colors font-medium ${
              currentFilter === "advanced"
                ? "bg-green-500 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-green-50 border-2 border-gray-200"
            }`}
          >
            고급
          </button>
        </div>

        {/* 수업 카드 그리드 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClasses.length > 0 ? (
            filteredClasses.map((classItem) => (
              <div
                key={classItem.id}
                className="class-card bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={classItem.thumbnail}
                    alt={classItem.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300/4ade80/ffffff?text=Yoga+Class";
                    }}
                  />
                  {classItem.hasVideo && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        <i className="fas fa-play mr-1"></i>영상
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {classItem.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      강사: {classItem.instructor}
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {classItem.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full font-medium ${getDifficultyColor(
                        classItem.level
                      )}`}
                    >
                      {getLevelText(classItem.level)}
                    </span>
                    <span className="flex items-center text-gray-600">
                      <i className="far fa-clock mr-1"></i>
                      {classItem.duration}분
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {classItem.hasVideo && (
                      <button
                        onClick={() => handleWatchVideo(classItem.videoId)}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors font-medium"
                      >
                        영상보기
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <i className="fas fa-search text-6xl text-gray-300 mb-6"></i>
              <p className="text-xl text-gray-500">
                해당 조건의 수업이 없습니다.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ClassesPage;
