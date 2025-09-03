import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../components/contexts/AppContext";

const InstructorDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const { user, bookClass } = useApp();

  // 1. 수업 예약 모달 관련 상태 추가
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedClassToBook, setSelectedClassToBook] = useState(null);

  useEffect(() => {
    // 더미 강사 상세 데이터 - InstructorsPage와 동일한 데이터 + 추가 정보
    const mockInstructorsDetail = {
      1: {
        id: 1,
        name: "박*온",
        specialty: "명상 요가",
        experience: "5년",
        description: "스트레스 해소와 마음의 평안을 위한 명상 요가 전문가",
        image:
          "https://www.shutterstock.com/image-photo/serene-indian-ethnicity-woman-sit-260nw-2070561431.jpg",
        qualifications: [
          "요가 지도자 자격증",
          "명상 지도사",
          "마음챙김 명상 지도자",
        ],
        classes: ["심신 안정 명상 요가", "마음챙김 명상", "스트레스 해소 요가"],
        bio: "10년간 명상을 수행하며 요가와 명상의 깊은 연결을 탐구해왔습니다. 현대인들의 스트레스와 불안을 해소하는 데 도움이 되는 실용적인 명상법과 요가 자세를 가르치고 있습니다.",
        education: [
          "서울대학교 체육교육학과 졸업",
          "인도 리시케시 요가 아쉬람 수료",
          "마음챙김 명상 지도자 과정 수료",
        ],
        philosophy:
          "요가는 단순한 운동이 아닌 마음과 몸, 그리고 영혼을 하나로 연결하는 수행입니다. 모든 수강생이 자신만의 평안을 찾을 수 있도록 돕는 것이 저의 사명입니다.",
        schedule: [
          {
            day: "월요일",
            time: "09:00-10:00",
            class: "심신 안정 명상 요가",
            level: "초급",
          },
          {
            day: "수요일",
            time: "14:00-15:00",
            class: "마음챙김 명상",
            level: "초급",
          },
          {
            day: "금요일",
            time: "19:00-20:00",
            class: "스트레스 해소 요가",
            level: "초급",
          },
        ],
        testimonials: [
          {
            id: 1,
            name: "김○○",
            rating: 5,
            comment:
              "박*온 강사님 덕분에 불면증이 많이 개선되었어요. 명상 요가 정말 추천합니다!",
            date: "2025-08-15",
          },
          {
            id: 2,
            name: "이○○",
            rating: 5,
            comment:
              "스트레스가 많았는데 강사님의 수업을 들으며 마음의 평안을 찾았습니다.",
            date: "2025-08-11",
          },
        ],
        contact: {
          email: "peaceful@yogaspace.com",
          instagram: "@peaceful_yoga",
        },
      },
      2: {
        id: 2,
        name: "김*련",
        specialty: "하타 요가",
        experience: "7년",
        description: "요가의 기본기를 탄탄하게 다져주는 하타 요가 전문가",
        image:
          "https://www.shutterstock.com/image-photo/young-female-yoga-teacher-smiling-260nw-2458502889.jpg",
        qualifications: [
          "국제 요가 지도자 자격증",
          "해부학 수료",
          "요가 교정 전문가",
        ],
        classes: ["하타 요가 기초", "요가 해부학", "초보자 요가"],
        bio: "정확한 자세와 안전한 수행을 최우선으로 하는 하타 요가 전문가입니다. 수강생 개개인의 신체 조건을 고려하여 맞춤형 지도를 제공합니다.",
        education: [
          "한국체육대학교 운동처방학과 졸업",
          "미국 요가 얼라이언스 RYT-500 인증",
          "요가 해부학 전문 과정 수료",
        ],
        philosophy:
          "올바른 기초가 모든 발전의 시작입니다. 안전하고 정확한 자세를 통해 요가의 진정한 혜택을 누리시기 바랍니다.",
        schedule: [
          {
            day: "화요일",
            time: "10:00-11:00",
            class: "하타 요가 기초",
            level: "초급",
          },
          {
            day: "목요일",
            time: "16:00-17:00",
            class: "요가 해부학",
            level: "중급",
          },
          {
            day: "토요일",
            time: "11:00-12:00",
            class: "초보자 요가",
            level: "초급",
          },
        ],
        testimonials: [
          {
            id: 1,
            name: "박○○",
            rating: 5,
            comment:
              "자세 교정을 꼼꼼하게 해주셔서 부상 없이 안전하게 요가를 배울 수 있었어요.",
            date: "2025-08-12",
          },
        ],
        contact: {
          email: "hatha@yogaspace.com",
          instagram: "@hatha_yoga_kim",
        },
      },
      3: {
        id: 3,
        name: "이*연",
        specialty: "빈야사 플로우",
        experience: "6년",
        description: "흐르는 듯한 동작으로 몸과 마음을 연결하는 빈야사 전문가",
        image:
          "https://www.shutterstock.com/image-photo/happy-fit-young-hispanic-woman-260nw-2476032295.jpg",
        qualifications: [
          "빈야사 요가 전문 지도자",
          "요가 철학 수료",
          "플로우 요가 마스터",
        ],
        classes: ["빈야사 플로우", "파워 플로우", "모닝 플로우"],
        bio: "요가를 통해 몸과 마음의 조화를 추구하며, 각자의 몸에 맞는 흐름을 찾아가는 것을 중요하게 생각합니다.",
        education: [
          "연세대학교 체육학과 졸업",
          "인도 고아 빈야사 요가 수련",
          "요가 철학 및 명상 과정 수료",
        ],
        philosophy:
          "요가는 흐름입니다. 호흡과 움직임이 하나가 되는 순간, 우리는 진정한 자유를 경험할 수 있습니다.",
        schedule: [
          {
            day: "월요일",
            time: "18:00-19:00",
            class: "빈야사 플로우",
            level: "중급",
          },
          {
            day: "수요일",
            time: "10:30-11:30",
            class: "모닝 플로우",
            level: "초급",
          },
          {
            day: "금요일",
            time: "17:00-18:00",
            class: "파워 플로우",
            level: "중급",
          },
        ],
        testimonials: [
          {
            id: 1,
            name: "정○○",
            rating: 5,
            comment:
              "동연 강사님의 플로우 수업은 정말 아름다워요. 마치 춤을 추는 것 같아요!",
            date: "2025-08-18",
          },
        ],
        contact: {
          email: "flow@yogaspace.com",
          instagram: "@vinyasa_flow_lee",
        },
      },
      4: {
        id: 4,
        name: "강*력",
        specialty: "파워 요가",
        experience: "8년",
        description: "체력과 근력을 기르는 강도 높은 요가 수업 전문가",
        image:
          "https://www.shutterstock.com/image-photo/trainer-teaching-yoga-pose-posture-260nw-2286247559.jpg",
        qualifications: [
          "파워 요가 전문 지도자",
          "피트니스 트레이너",
          "근력 트레이닝 전문가",
        ],
        classes: ["파워 요가", "요가 피트니스", "코어 요가"],
        bio: "요가와 피트니스를 결합하여 강하고 건강한 몸을 만드는 것을 전문으로 합니다. 초보자부터 고급자까지 단계별 지도를 제공합니다.",
        education: [
          "한국스포츠대학교 운동과학과 졸업",
          "NSCA 공인 트레이너 자격",
          "파워 요가 국제 인증",
        ],
        philosophy:
          "강한 몸에 건강한 정신이 깃든다. 요가를 통해 신체적, 정신적 한계를 뛰어넘어보세요.",
        schedule: [
          {
            day: "화요일",
            time: "19:30-20:30",
            class: "파워 요가",
            level: "고급",
          },
          {
            day: "목요일",
            time: "07:00-08:00",
            class: "모닝 파워",
            level: "중급",
          },
          {
            day: "토요일",
            time: "15:00-16:00",
            class: "코어 요가",
            level: "중급",
          },
        ],
        testimonials: [
          {
            id: 1,
            name: "최○○",
            rating: 5,
            comment:
              "체력 강사님 수업 듣고 정말 몸이 탄탄해졌어요. 강도는 높지만 효과가 확실해요!",
            date: "2025-08-13",
          },
        ],
        contact: {
          email: "power@yogaspace.com",
          instagram: "@power_yoga_kang",
        },
      },
      5: {
        id: 5,
        name: "정*음",
        specialty: "아이엔가 요가",
        experience: "9년",
        description: "정확한 자세와 정렬을 중시하는 아이엔가 요가 전문가",
        image:
          "https://www.shutterstock.com/image-photo/female-yoga-instructor-helping-her-260nw-2296255515.jpg",
        qualifications: [
          "아이엔가 요가 인증 지도자",
          "요가 해부학 전문가",
          "자세 교정 전문가",
        ],
        classes: ["아이엔가 요가", "요가 교정", "치료 요가"],
        bio: "정확한 자세와 신체 정렬을 통해 요가의 치료적 효과를 극대화하는 것을 전문으로 합니다.",
        education: [
          "이화여자대학교 물리치료학과 졸업",
          "인도 푸네 아이엔가 요가 연구소 수료",
          "요가 치료학 석사",
        ],
        philosophy:
          "정확한 자세가 모든 치유의 시작입니다. 몸의 지혜를 깨우는 것이 진정한 요가입니다.",
        schedule: [
          {
            day: "월요일",
            time: "14:00-15:30",
            class: "아이엔가 요가",
            level: "중급",
          },
          {
            day: "수요일",
            time: "16:00-17:00",
            class: "요가 교정",
            level: "초급",
          },
          {
            day: "금요일",
            time: "10:00-11:30",
            class: "치료 요가",
            level: "초급",
          },
        ],
        testimonials: [
          {
            id: 1,
            name: "한○○",
            rating: 5,
            comment:
              "마음 강사님 덕분에 허리 통증이 많이 좋아졌어요. 정말 감사합니다!",
            date: "2025-08-14",
          },
        ],
        contact: {
          email: "iyengar@yogaspace.com",
          instagram: "@iyengar_yoga_jung",
        },
      },
      6: {
        id: 6,
        name: "한*요",
        specialty: "음 요가",
        experience: "4년",
        description: "깊은 이완과 스트레칭을 위한 음 요가 전문가",
        image:
          "https://i.pinimg.com/736x/da/2a/43/da2a435e033cadfab6e365b0a5c69b13.jpg",
        qualifications: [
          "음 요가 지도자",
          "태국 마사지 테라피스트",
          "명상 지도사",
        ],
        classes: ["음 요가", "회복 요가", "밤 요가"],
        bio: "바쁜 일상에 지친 현대인들에게 깊은 휴식과 치유를 제공하는 것을 목표로 합니다.",
        education: [
          "홍익대학교 무용학과 졸업",
          "태국 치앙마이 마사지 스쿨 수료",
          "음 요가 국제 인증",
        ],
        philosophy:
          "때로는 멈춤이 움직임보다 강력합니다. 고요함 속에서 진정한 힘을 발견하세요.",
        schedule: [
          {
            day: "화요일",
            time: "20:00-21:30",
            class: "음 요가",
            level: "초급",
          },
          {
            day: "목요일",
            time: "19:00-20:00",
            class: "회복 요가",
            level: "초급",
          },
          {
            day: "일요일",
            time: "18:00-19:30",
            class: "밤 요가",
            level: "초급",
          },
        ],
        testimonials: [
          {
            id: 1,
            name: "송○○",
            rating: 5,
            comment:
              "고요 강사님의 음 요가는 정말 힐링이에요. 스트레스가 다 풀려요.",
            date: "2025-08-18",
          },
        ],
        contact: {
          email: "yin@yogaspace.com",
          instagram: "@yin_yoga_han",
        },
      },
    };

    const loadInstructorDetail = () => {
      setLoading(true);
      setTimeout(() => {
        const instructorData = mockInstructorsDetail[id];
        if (instructorData) {
          setInstructor(instructorData);
        }
        setLoading(false);
      }, 500);
    };

    loadInstructorDetail();
  }, [id]);

  // 2. handleBookClass 함수 수정: 모달을 열고 상태에 수업 정보를 저장
  const handleBookClass = (classInfo) => {
    if (!user) {
      alert("수업 예약을 위해 로그인이 필요합니다.");
      return;
    }
    // 선택된 수업 정보와 강사 정보를 상태에 저장
    setSelectedClassToBook({
      ...classInfo,
      instructorName: instructor.name,
    });
    // 모달을 열도록 상태 변경
    setIsBookingModalOpen(true);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fas fa-star ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const getSpecialtyColor = (specialty) => {
    const colors = {
      "명상 요가": "bg-purple-100 text-purple-800",
      "하타 요가": "bg-blue-100 text-blue-800",
      "빈야사 플로우": "bg-green-100 text-green-800",
      "파워 요가": "bg-red-100 text-red-800",
      "아이엔가 요가": "bg-orange-100 text-orange-800",
      "음 요가": "bg-indigo-100 text-indigo-800",
    };
    return colors[specialty] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-green-500 mb-4"></i>
          <p className="text-gray-600">강사 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
          <p className="text-gray-600 mb-4">강사 정보를 찾을 수 없습니다.</p>
          <button
            onClick={() => navigate("/instructors")}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            강사 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 뒤로가기 버튼 */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate("/instructors")}
            className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            강사 목록으로 돌아가기
          </button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* 강사 프로필 헤더 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={instructor.image}
                alt={instructor.name}
                className="w-full h-64 md:h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/400x300/4ade80/ffffff?text=${instructor.name}`;
                }}
              />
            </div>
            <div className="md:w-2/3 p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {instructor.name} 강사
                  </h1>
                  <div className="flex items-center mb-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium mr-3 ${getSpecialtyColor(
                        instructor.specialty
                      )}`}
                    >
                      {instructor.specialty}
                    </span>
                    <span className="text-gray-600">
                      <i className="fas fa-clock mr-1"></i>
                      경력 {instructor.experience}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <button
                    // 2. 전체 수업 예약 버튼에 핸들러 연결
                    onClick={() =>
                      handleBookClass({
                        class: instructor.classes[0],
                        day: "전체",
                        time: "협의",
                      })
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                  >
                    <i className="fas fa-calendar-plus mr-2"></i>
                    수업 예약
                  </button>
                  <button className="bg-white hover:bg-gray-50 text-green-600 px-6 py-2 rounded-lg transition-colors font-medium border border-green-200">
                    <i className="fas fa-heart mr-2 text-pink-500"></i>


                    찜하기
                  </button>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{instructor.description}</p>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">자격증</h3>
                <div className="flex flex-wrap gap-2">
                  {instructor.qualifications.map((qual, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {qual}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                {instructor.contact.email && (
                  <a
                    href={`mailto:${instructor.contact.email}`}
                    className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <i className="fas fa-envelope mr-2"></i>
                    이메일
                  </a>
                )}
                {instructor.contact.instagram && (
                  <a
                    href={`https://instagram.com/${instructor.contact.instagram.replace(
                      "@",
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <i className="fab fa-instagram mr-2"></i>
                    인스타그램
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: "profile", label: "프로필", icon: "fas fa-user" },
                {
                  key: "schedule",
                  label: "수업 일정",
                  icon: "fas fa-calendar",
                },
                { key: "reviews", label: "리뷰", icon: "fas fa-star" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.key
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <i className={`${tab.icon} mr-2`}></i>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* 프로필 탭 */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    소개
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {instructor.bio}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    학력 및 교육
                  </h3>
                  <ul className="space-y-2">
                    {instructor.education.map((edu, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-600"
                      >
                        <i className="fas fa-graduation-cap text-green-500 mr-3"></i>
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    요가 철학
                  </h3>
                  <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-600">
                    "{instructor.philosophy}"
                  </blockquote>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    담당 수업
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {instructor.classes.map((className, index) => (
                      <div
                        key={index}
                        className="bg-green-50 border border-green-200 rounded-lg p-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-green-800">
                            {className}
                          </span>
                          <button
                            // 2. 담당 수업 예약 버튼에 핸들러 연결
                            onClick={() =>
                              handleBookClass({
                                class: className,
                                day: "협의",
                                time: "협의",
                              })
                            }
                            className="text-green-600 hover:text-green-800 text-sm"
                          >
                            예약하기
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 수업 일정 탭 */}
            {activeTab === "schedule" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  주간 수업 일정
                </h3>
                <div className="space-y-3">
                  {instructor.schedule.map((schedule, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="font-semibold text-gray-800 mr-3">
                              {schedule.day}
                            </span>
                            <span className="text-green-600 font-medium">
                              {schedule.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-gray-700">
                              {schedule.class}
                            </span>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                              {schedule.level}
                            </span>
                          </div>
                        </div>
                        <button
                          // 2. 수업 일정 탭의 예약하기 버튼에 핸들러 연결
                          onClick={() => handleBookClass(schedule)}
                          className="mt-3 md:mt-0 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                        >
                          예약하기
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 리뷰 탭 */}
            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    수강생 리뷰
                  </h3>
                  <div className="flex items-center">
                    <div className="flex mr-2">{renderStars(5)}</div>
                    <span className="text-gray-600">
                      ({instructor.testimonials.length}개 리뷰)
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {instructor.testimonials.map((review) => (
                    <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-800 mr-3">
                            {review.name}
                          </span>
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <span className="text-gray-500 text-sm">
                          {review.date}
                        </span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors font-medium">
                    리뷰 작성하기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 3. 수업 예약 모달 추가 */}
      {isBookingModalOpen && selectedClassToBook && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
          onClick={() => setIsBookingModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-8 w-full max-w-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">
                {selectedClassToBook.instructorName} 강사 수업 예약
              </h3>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="mb-4 text-center text-lg">
              <p className="text-green-600 font-semibold mb-1">
                {selectedClassToBook.class}
              </p>
              <p className="text-gray-500 text-sm">
                <i className="fas fa-calendar mr-1"></i>
                {selectedClassToBook.day || "날짜 협의"} /
                <i className="fas fa-clock ml-2 mr-1"></i>
                {selectedClassToBook.time || "시간 협의"}
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log(
                  "예약 정보:",
                  e.target.date.value,
                  e.target.time.value,
                  e.target.participants.value
                );
                alert("수업 예약이 완료되었습니다!");
                setIsBookingModalOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="date" className="block text-gray-700">
                  날짜
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-gray-700">
                  시간
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  required
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label htmlFor="participants" className="block text-gray-700">
                  참석 인원
                </label>
                <input
                  type="number"
                  id="participants"
                  name="participants"
                  min="1"
                  defaultValue="1"
                  required
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  닫기
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-bold"
                >
                  예약 확정
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorDetailPage;
