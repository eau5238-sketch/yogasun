import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../components/contexts/AppContext";
import AIRecommendationModal from "../components/ai/AIRecommendationModal";
import BookingModal from "../components/booking/BookingModal";
import FAQ from "../components/contact/FAQ";
import PrivacyPolicy from "../components/contact/PrivacyPolicy";
import { yogaService } from "../services/yogaService";

const HomePage = () => {
  const { setShowLogin, setShowRegister } = useApp();
  const [showAIModal, setShowAIModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [freeTrialClasses, setFreeTrialClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentSection, setCurrentSection] = useState("home");
  const navigate = useNavigate();

  // 무료체험 수업 데이터 가져오기
  useEffect(() => {
    const fetchFreeTrialClasses = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await yogaService.getFreeTrialClasses();

        // 서버에서 받은 데이터 구조에 따라 처리
        if (Array.isArray(data)) {
          setFreeTrialClasses(data);
        } else if (data && Array.isArray(data.classes)) {
          setFreeTrialClasses(data.classes);
        } else if (data && Array.isArray(data.data)) {
          setFreeTrialClasses(data.data);
        } else {
          console.warn("예상하지 못한 데이터 구조:", data);
          setFreeTrialClasses([]);
        }
      } catch (error) {
        setError("데이터 로딩 중 오류가 발생했습니다.");
        console.error("데이터 로딩 실패:", error);

        // 개발 중에는 목업 데이터 사용 (선택사항)
        if (process.env.NODE_ENV === "development") {
          setFreeTrialClasses([
            {
              id: 1,
              title: "꼭 필요한 6가지 요가 동작",
              instructor: "에*린 mind yoga",
              duration: "15:53",
              views: "607,914",
              videoUrl: "https://www.youtube.com/embed/Hv5dNa_JqFs",
              level: "beginner",
              description: "효과만점 기본 스트레칭, 기초요가 배우기",
            },
          ]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFreeTrialClasses();
  }, []);
  // AI 모달 열기
  const handleShowAIModal = () => {
    setShowAIModal(true);
  };

  // 예약하기 버튼 클릭
  const handleBooking = (classInfo) => {
    setSelectedClass(classInfo);
    setShowBookingModal(true);
  };

  // 수업 페이지로 이동
  const handleViewClasses = () => {
    navigate("/classes");
  };

  // 레벨별 배지 컴포넌트
  const LevelBadge = ({ level }) => {
    const getLevelInfo = (level) => {
      const levels = {
        beginner: {
          name: "초급",
          color: "bg-green-100 text-green-800",
        },
        intermediate: {
          name: "중급",
          color: "bg-yellow-100 text-yellow-800",
        },
        advanced: {
          name: "고급",
          color: "bg-red-100 text-red-800",
        },
        all: {
          name: "모든레벨",
          color: "bg-blue-100 text-blue-800",
        },
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

  // FAQ 렌더링 함수
  const renderFAQ = () => (
    <div className="min-h-screen bg-gray-50 py-20">
      <FAQ />
      <div className="text-center mt-8">
        <button
          onClick={() => setCurrentSection("home")}
          className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );

  // 이용약관 렌더링 함수
  const renderTerms = () => (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">이용약관</h1>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-purple-600">
              제1조 (목적)
            </h2>
            <p className="text-gray-700 leading-relaxed">
              이 약관은 MindYoga(이하 "회사")가 제공하는 온라인 요가 서비스의
              이용조건 및 절차, 회사와 회원의 권리, 의무 및 책임사항을 규정함을
              목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-purple-600">
              제2조 (정의)
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                1. "서비스"란 회사가 제공하는 온라인 요가 클래스, AI 맞춤 추천,
                건강 관리 시스템 등 모든 서비스를 의미합니다.
              </p>
              <p>
                2. "회원"이란 회사의 약관에 동의하고 개인정보를 제공하여
                회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며 회사가
                제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
              </p>
              <p>
                3. "아이디(ID)"란 회원의 식별과 서비스 이용을 위하여 회원이
                정하고 회사가 승인하는 문자 또는 숫자의 조합을 의미합니다.
              </p>
              <p>
                4. "비밀번호(패스워드)"란 회원이 부여받은 아이디와 일치되는
                회원임을 확인하고 비밀보호를 위해 회원 자신이 정한 문자 또는
                숫자의 조합을 의미합니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-purple-600">
              제3조 (약관의 효력 및 변경)
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                1. 이 약관은 서비스를 이용하고자 하는 모든 이용자에 대하여 그
                효력을 발생합니다.
              </p>
              <p>
                2. 회사는 합리적인 사유가 발생될 경우에는 관련 법령에 위배되지
                않는 범위 내에서 이 약관을 개정할 수 있습니다.
              </p>
              <p>
                3. 약관이 변경되는 경우 회사는 변경된 약관을 그 적용일자 15일
                이전부터 적용일자 전일까지 공지합니다.
              </p>
              <p>
                4. 회원이 변경된 약관에 동의하지 않는 경우, 회원은 서비스
                이용계약을 해지할 수 있습니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-purple-600">
              제4조 (서비스의 제공 및 변경)
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>1. 회사는 다음과 같은 업무를 수행합니다:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>온라인 요가 클래스 제공</li>
                <li>AI 기반 개인 맞춤 요가 추천</li>
                <li>건강 관리 및 분석 서비스</li>
                <li>수업 예약 및 관리 시스템</li>
                <li>기타 회사가 정하는 서비스</li>
              </ul>
              <p>
                2. 회사는 운영상, 기술상의 필요에 따라 제공하고 있는 전부 또는
                일부 서비스를 변경할 수 있습니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-purple-600">
              제5조 (서비스의 중단)
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                1. 회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장,
                통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을
                일시적으로 중단할 수 있습니다.
              </p>
              <p>
                2. 회사는 국가비상사태, 서비스 설비의 장애 또는 서비스 이용의
                폭주 등으로 서비스 이용에 지장이 있는 때에는 서비스의 전부 또는
                일부를 제한하거나 중단할 수 있습니다.
              </p>
            </div>
          </section>
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => setCurrentSection("home")}
          className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );

  // 개인정보처리방침 렌더링 함수
  const renderPrivacy = () => (
    <div className="min-h-screen bg-gray-50 py-20">
      <PrivacyPolicy />
      <div className="text-center mt-8">
        <button
          onClick={() => setCurrentSection("home")}
          className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );

  // 메인 렌더링 로직
  if (currentSection === "faq") return renderFAQ();
  if (currentSection === "terms") return renderTerms();
  if (currentSection === "privacy") return renderPrivacy();

  // 기본 홈 화면
  return (
    <div className="fade-in">
      {/* 히어로 섹션 */}
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
              <button
                onClick={handleShowAIModal}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <i className="fas fa-robot mr-2"></i>
                AI 맞춤 요가 추천받기
              </button>
              <button
                onClick={handleViewClasses}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <i className="fas fa-dumbbell mr-2"></i>
                요가수업보기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 무료체험 섹션 */}
      <section id="trial" className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">무료체험</h2>
            <p className="text-xl text-gray-600">
              에일린 강사의 "꼭 필요한 6가지 요가 동작"을 무료로 체험해보세요
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="video-responsive">
              <iframe
                width="100%"
                height="450"
                src="https://www.youtube.com/embed/Hv5dNa_JqFs?rel=0&modestbranding=1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="꼭 필요한 6가지 요가 동작"
                className="rounded-t-lg"
              ></iframe>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">
                꼭 필요한 6가지 요가 동작
              </h3>
              <p className="text-gray-600 mb-4">
                효과만점 기본 스트레칭, 기초요가 배우기
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <i className="fas fa-user mr-2"></i>
                <span className="mr-4">에일린 mind yoga</span>
                <i className="fas fa-clock mr-2"></i>
                <span className="mr-4">15:53</span>
                <i className="fas fa-eye mr-2"></i>
                <span>607,914 views</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 특징 섹션 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              왜 MindYoga인가요?
            </h2>
            <p className="text-xl text-gray-600">
              개인 맞춤형 요가 경험을 제공하는 이유
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: "🤖",
                title: "AI 맞춤 추천",
                description: "개인 수준과 목표에 맞는 최적의 요가 추천",
              },
              {
                icon: "⏰",
                title: "실시간 수업 예약",
                description: "언제 어디서나 원하는 시간에 요가 수업을 예약",
              },
              {
                icon: "💪",
                title: "건강 관리 시스템",
                description: "체계적인 건강 데이터 관리로 효과 확인",
              },
              {
                icon: "🏆",
                title: "챌린지 시스템",
                description: "재미있는 챌린지로 꾸준한 동기부여",
              },
              {
                icon: "👩‍🏫",
                title: "전문 강사진",
                description: "경험 풍부한 한국 요가 전문가들의 지도",
              },
              {
                icon: "📹",
                title: "고품질 영상",
                description: "전문 강사의 실제 YouTube 고화질 영상",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-105 card"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 네비게이션 섹션 - 3개 카드로 정리 */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">❓</div>
              <h3 className="text-xl font-bold mb-2">자주 묻는 질문</h3>
              <p className="text-gray-600 mb-4">
                궁금한 점을 빠르게 해결해보세요
              </p>
              <button
                onClick={() => setCurrentSection("faq")}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                FAQ 보기
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-2">이용약관</h3>
              <p className="text-gray-600 mb-4">
                서비스 이용 규정을 확인하세요
              </p>
              <button
                onClick={() => setCurrentSection("terms")}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                약관 보기
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2">개인정보처리방침</h3>
              <p className="text-gray-600 mb-4">
                개인정보 보호정책을 확인하세요
              </p>
              <button
                onClick={() => setCurrentSection("privacy")}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                방침 보기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 모달 컴포넌트들 */}
      {showAIModal && (
        <AIRecommendationModal onClose={() => setShowAIModal(false)} />
      )}
      {showBookingModal && (
        <BookingModal
          classInfo={selectedClass}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
};

export default HomePage;
