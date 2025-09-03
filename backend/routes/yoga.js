const express = require("express");
const router = express.Router();

// 요가 클래스 데이터
const yogaClasses = [
  // 초급 (Beginner) 영상들
  {
    id: 1,
    title: "아침을 여는 모닝 요가",
    instructor: "에*린",
    duration: "10",
    level: "beginner",
    videoId: "BjEq1AVRgzc",
    description: "아침에 눈뜨자마자 침대에서 하는 10분 모닝 요가 루틴",
    thumbnail: "https://i.ytimg.com/vi/BjEq1AVRgzc/hqdefault.jpg",
  },
  {
    id: 2,
    title: "편안한 저녁 요가",
    instructor: "에*린",
    duration: "20",
    level: "beginner",
    videoId: "umEJnBsHjqg",
    description: "저녁에 하기 좋은 20분 요가, 자기전 스트레칭",
    thumbnail: "https://i.ytimg.com/vi/umEJnBsHjqg/hqdefault.jpg",
  },
  {
    id: 3,
    title: "10분 매일 해야하는 전신 요가 스트레칭",
    instructor: "크*우",
    duration: "10",
    level: "beginner",
    videoId: "eTuWJbdqHMc",
    description:
      "매일 해주어야 하는 전신 스트레칭. 굳은 몸을 구석구석 풀어주는 10분 스트레칭",
    thumbnail: "https://i.ytimg.com/vi/eTuWJbdqHMc/hqdefault.jpg",
  },
  {
    id: 4,
    title: "전신 스트레칭 데일리 요가 루틴",
    instructor: "크*우",
    duration: "13",
    level: "beginner",
    videoId: "BDHzMbaTmvw",
    description:
      "온 몸의 붓기와 독소를 싹 빼주는 전신 요가 스트레칭. 아침 요가로 좋아요",
    thumbnail: "https://i.ytimg.com/vi/BDHzMbaTmvw/hqdefault.jpg",
  },
  {
    id: 5,
    title: "10분 전신 모닝 요가 스트레칭",
    instructor: "크*우",
    duration: "12",
    level: "beginner",
    videoId: "RiaDnf0tb0c",
    description: "아침에 하기 좋은 10분 전신 모닝요가 스트레칭",
    thumbnail: "https://i.ytimg.com/vi/RiaDnf0tb0c/hqdefault.jpg",
  },
  {
    id: 6,
    title: "자기 전에 하면 딱 좋은 요가",
    instructor: "에*린",
    duration: "15",
    level: "beginner",
    videoId: "EOJa7MqnVrs",
    description:
      "자기 전 몸과 마음을 편안하게 이완하는 요가 스트레칭과 호흡 명상",
    thumbnail: "https://i.ytimg.com/vi/EOJa7MqnVrs/hqdefault.jpg",
  },
  {
    id: 7,
    title: "누워서 전신을 풀어주는 요가",
    instructor: "에*린",
    duration: "21",
    level: "beginner",
    videoId: "bLHGYOXpgO8",
    description:
      "운동하기 귀찮은 날, 누워서 할 수 있는 요가. 전신을 시원하게 풀어주는 효과 좋은 스트레칭",
    thumbnail: "https://i.ytimg.com/vi/bLHGYOXpgO8/hqdefault.jpg",
  },
  {
    id: 8,
    title: "16분 구석구석 전신 스트레칭",
    instructor: "*경",
    duration: "17",
    level: "beginner",
    videoId: "hSW2yuvtPmM",
    description:
      "유연성 없이도 할 수 있는 전신순환요가로 데일리루틴으로 반복하기 좋아요",
    thumbnail: "https://i.ytimg.com/vi/hSW2yuvtPmM/hqdefault.jpg",
  },
  {
    id: 9,
    title: "25분 굿나잇 하타요가",
    instructor: "*경",
    duration: "26",
    level: "beginner",
    videoId: "M4VhsdgflHM",
    description:
      "잠들기 전, 숙면을 도와주는 가벼운 명상과 동작들로 차분히 움직여봐요",
    thumbnail: "https://i.ytimg.com/vi/M4VhsdgflHM/hqdefault.jpg",
  },
  {
    id: 10,
    title: "승모근 풀어주는 스트레칭 - 목/어깨 결림 해결",
    instructor: "요*",
    duration: "21",
    level: "beginner",
    videoId: "auczHg2Qh70",
    description:
      "뒷목과 어깨 주변의 뻐근함 해결. 다양한 승모근 스트레칭 동작으로 엮은 루틴",
    thumbnail: "https://i.ytimg.com/vi/auczHg2Qh70/hqdefault.jpg",
  },
  {
    id: 11,
    title: "15분 모닝 요가 - 굳은 몸 회복",
    instructor: "요*",
    duration: "18",
    level: "beginner",
    videoId: "ezEs6sbSsOg",
    description:
      "15분 모닝 요가 프로그램으로 몸 전체를 스트레칭하는 동작으로 구성",
    thumbnail: "https://i.ytimg.com/vi/ezEs6sbSsOg/hqdefault.jpg",
  },

  // 중급 (Intermediate) 영상들
  {
    id: 12,
    title: "파워 요가 - 전신 근력 강화",
    instructor: "에*린",
    duration: "25",
    level: "intermediate",
    videoId: "ce4ecIylmvM",
    description: "땀범벅 힘들지만 뿌듯한 25분 파워요가",
    thumbnail: "https://i.ytimg.com/vi/ce4ecIylmvM/hqdefault.jpg",
  },
  {
    id: 13,
    title: "45분 양요가 + 인요가 시퀀스",
    instructor: "에*린",
    duration: "49",
    level: "intermediate",
    videoId: "eDUxGR6VwLg",
    description:
      "몸과 마음의 균형을 위한 45분 인양요가 시퀀스. 역동적인 양요가 + 차분한 인요가",
    thumbnail: "https://i.ytimg.com/vi/eDUxGR6VwLg/hqdefault.jpg",
  },
  {
    id: 14,
    title: "45분 하타요가 - 가슴열기 & 호흡",
    instructor: "*경",
    duration: "47",
    level: "intermediate",
    videoId: "gAkiDgiLGbI",
    description:
      "초중급을 위한 하타요가. 45분동안 부담없이 움직이며 한동작한동작 섬세하게",
    thumbnail: "https://i.ytimg.com/vi/gAkiDgiLGbI/hqdefault.jpg",
  },
  {
    id: 15,
    title: "좌골신경통 완화 요가 스트레칭",
    instructor: "요*",
    duration: "34",
    level: "intermediate",
    videoId: "kD71MofK7ro",
    description:
      "다리, 엉덩이, 허리 그리고 등 부근의 피로와 통증을 해소하는 30분 치료 요가",
    thumbnail: "https://i.ytimg.com/vi/kD71MofK7ro/hqdefault.jpg",
  },
  {
    id: 16,
    title: "요가원처럼 40분 풀시퀀스 홈요가",
    instructor: "*스",
    duration: "41",
    level: "intermediate",
    videoId: "WM0bP-a8cJ0",
    description:
      "집에서 요가원에 온것처럼 웜업부터 쿨다운까지. 전신스트레칭부터 근력까지 모든 운동",
    thumbnail: "https://i.ytimg.com/vi/WM0bP-a8cJ0/hqdefault.jpg",
  },
  {
    id: 17,
    title: "요가원 출석 40분 풀 시퀀스",
    instructor: "*스",
    duration: "40",
    level: "intermediate",
    videoId: "2cfA45j4slM",
    description:
      "요가원에서 하는 요가처럼 차분하게 이어가는 풀시퀀스. 웜업부터 쿨다운까지",
    thumbnail: "https://i.ytimg.com/vi/2cfA45j4slM/hqdefault.jpg",
  },

  // 고급 (Advanced) 영상들
  {
    id: 18,
    title: "60분 전신 스트레칭 & 근력운동 요가",
    instructor: "*스",
    duration: "58",
    level: "advanced",
    videoId: "MI8VrVKuZTY",
    description:
      "전신스트레칭과 근력운동을 한번에. 온라인 요가원! 자세한 설명과 함께 호흡하며",
    thumbnail: "https://i.ytimg.com/vi/MI8VrVKuZTY/hqdefault.jpg",
  },

  // 요가 명상 음악 영상들
  {
    id: 19,
    title: "10분 요가 명상 음악 - 마음의 평화",
    instructor: "명상*음악",
    duration: "10",
    level: "meditation",
    videoId: "jfKfPfyJRdk",
    description:
      "요가 수련 후 마음을 진정시키는 10분 명상 음악. 깊은 이완과 평온함을 경험하세요",
    thumbnail: "https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg",
  },
  {
    id: 20,
    title: "15분 요가 명상 음악 - 호흡과 함께",
    instructor: "명상*음악",
    duration: "15",
    level: "meditation",
    videoId: "lFcSrYw-ARY",
    description:
      "호흡에 집중하며 마음을 가라앉히는 15분 요가 명상 음악. 스트레스 해소에 효과적",
    thumbnail: "https://i.ytimg.com/vi/lFcSrYw-ARY/hqdefault.jpg",
  },
  {
    id: 21,
    title: "20분 요가 명상 음악 - 깊은 이완",
    instructor: "명상*음악",
    duration: "20",
    level: "meditation",
    videoId: "inpok4MKVLM",
    description:
      "완전한 이완을 위한 20분 요가 명상 음악. 긴장을 풀고 내면의 평화를 찾아보세요",
    thumbnail: "https://i.ytimg.com/vi/inpok4MKVLM/hqdefault.jpg",
  },
  {
    id: 22,
    title: "14분 요가 명상 음악 - 스트레스 해소",
    instructor: "명상*음악",
    duration: "14",
    level: "meditation",
    videoId: "q76bMs-NwRk",
    description:
      "스트레스와 긴장을 해소하는 14분 요가 명상 음악. 마음을 가볍게 만들어보세요",
    thumbnail: "https://i.ytimg.com/vi/q76bMs-NwRk/hqdefault.jpg",
  },
];

// 무료 체험 클래스
router.get("/free-trial", (req, res) => {
  console.log("📥 GET /api/yoga/free-trial 요청 받음");

  const freeTrialClasses = [
    {
      id: 1,
      title: "꼭 필요한 6가지 요가 동작",
      instructor: "에*린 mind yoga",
      duration: "15:53",
      views: "607,914",
      level: "beginner",
      videoUrl: "https://www.youtube.com/embed/Hv5dNa_JqFs",
      description: "효과만점 기본 스트레칭, 기초요가 배우기",
    },
  ];

  res.json(freeTrialClasses);
});

// 요가 클래스 목록 (레벨별 필터링 지원)
router.get("/classes", (req, res) => {
  console.log("📥 GET /api/yoga/classes 요청 받음");

  const { level } = req.query;
  let filteredClasses = yogaClasses;

  if (level) {
    filteredClasses = yogaClasses.filter((cls) => cls.level === level);
  }

  res.json({
    data: filteredClasses,
    total: filteredClasses.length,
    level: level || "all",
  });
});

// 특정 레벨의 클래스만 조회
router.get("/classes/level/:level", (req, res) => {
  const { level } = req.params;
  console.log(`📥 GET /api/yoga/classes/level/${level} 요청 받음`);

  const validLevels = ["beginner", "intermediate", "advanced"];
  if (!validLevels.includes(level)) {
    return res.status(400).json({
      error:
        "유효하지 않은 레벨입니다. beginner, intermediate, advanced 중 선택해주세요.",
    });
  }

  const levelClasses = yogaClasses.filter((cls) => cls.level === level);

  res.json({
    data: levelClasses,
    total: levelClasses.length,
    level: level,
  });
});

// 강사 목록
router.get("/instructors", (req, res) => {
  console.log("📥 GET /api/yoga/instructors 요청 받음");

  const instructors = [
    {
      id: 1,
      name: "김*가",
      experience: "5년",
      specialty: "하타요가",
    },
    {
      id: 2,
      name: "박*가",
      experience: "8년",
      specialty: "빈야사요가",
    },
  ];

  res.json({ data: instructors });
});

// 요가 레벨
router.get("/levels", (req, res) => {
  console.log("📥 GET /api/yoga/levels 요청 받음");

  const levels = [
    {
      id: "beginner",
      name: "초급",
      description: "요가를 처음 시작하는 분",
      count: yogaClasses.filter((c) => c.level === "beginner").length,
    },
    {
      id: "intermediate",
      name: "중급",
      description: "기본 동작을 익힌 분",
      count: yogaClasses.filter((c) => c.level === "intermediate").length,
    },
    {
      id: "advanced",
      name: "고급",
      description: "고난이도 동작이 가능한 분",
      count: yogaClasses.filter((c) => c.level === "advanced").length,
    },
    {
      id: "meditation",
      name: "명상",
      description: "마음의 평화를 찾고 싶은 분",
      count: yogaClasses.filter((c) => c.level === "meditation").length,
    },
  ];

  res.json({ data: levels });
});

module.exports = router;
