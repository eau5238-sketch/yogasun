import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingModal from "../booking/BookingModal";

const InstructorSection = ({ handleBooking }) => {
  const navigate = useNavigate();
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const instructors = [
    {
      id: 1,
      name: "에*린",
      specialty: "마인드 요가 전문",
      experience: "8년 경력, RYT-500 자격증",
      image:
        "https://yt3.googleusercontent.com/ytc/AIdro_kKZhCBHjk2tGKHqalB7S_kKrMJXpLaxLuHsDNrZw=s176-c-k-c0x00ffffff-no-rj",
      description: "유튜브 구독자 100만명의 믿고 따라하는 요가 강사",
      rating: 4.9,
      totalClasses: "200+",
      gradient: "from-pink-400 to-purple-500",
      price: {
        personal: 60000,
        group: 30000,
        online: 20000,
      },
    },
    {
      id: 2,
      name: "조*수",
      specialty: "빈야사 요가 전문",
      experience: "7년 경력, RYT-500 자격증",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      description: "파워풀한 빈야사 요가 전문가로 역동적인 플로우를 선사합니다",
      rating: 4.8,
      totalClasses: "150+",
      gradient: "from-blue-400 to-teal-500",
      price: {
        personal: 55000,
        group: 28000,
        online: 18000,
      },
    },
    {
      id: 3,
      name: "박*현",
      specialty: "파워 요가 전문",
      experience: "6년 경력, RYT-300 자격증",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      description:
        "역동적이고 강력한 파워 요가로 체력과 근력을 동시에 향상시킵니다",
      rating: 4.7,
      totalClasses: "120+",
      gradient: "from-green-400 to-blue-500",
      price: {
        personal: 50000,
        group: 25000,
        online: 15000,
      },
    },
    {
      id: 4,
      name: "김*빈",
      specialty: "리스토러티브 요가 전문",
      experience: "6년 경력, RYT-300 자격증",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b1c7?w=400&h=400&fit=crop&crop=face",
      description: "깊은 휴식과 치유를 통한 몸과 마음의 회복을 도와드립니다",
      rating: 4.8,
      totalClasses: "180+",
      gradient: "from-yellow-400 to-orange-500",
      price: {
        personal: 45000,
        group: 22000,
        online: 15000,
      },
    },
  ];

  const handleBookingClick = (instructor) => {
    setSelectedInstructor(instructor);
    setShowBookingModal(true);

    // 외부 handleBooking 함수가 있다면 호출
    if (handleBooking) {
      handleBooking({
        instructor: instructor.name,
        title: "강사 수업",
      });
    }
  };

  const handleProfileView = (instructor) => {
    navigate(`/instructors/${instructor.id}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star text-yellow-500"></i>);
    }

    if (hasHalfStar) {
      stars.push(
        <i key="half" className="fas fa-star-half-alt text-yellow-500"></i>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i key={`empty-${i}`} className="far fa-star text-yellow-500"></i>
      );
    }

    return stars;
  };

  return (
    <>
      <section id="instructors" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              전문 강사진
            </h2>
            <p className="text-lg text-gray-600">
              전문성과 경험을 갖춘 요가 강사들과 함께하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {instructors.map((instructor) => (
              <div
                key={instructor.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* 강사 이미지 */}
                <div className="relative">
                  {instructor.image ? (
                    <img
                      src={instructor.image}
                      alt={instructor.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        // 이미지 로드 실패 시 그라디언트 배경으로 대체
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}

                  {/* 그라디언트 배경 (이미지 대체용) */}
                  <div
                    className={`w-full h-48 bg-gradient-to-br ${
                      instructor.gradient
                    } flex items-center justify-center ${
                      instructor.image ? "hidden" : "flex"
                    }`}
                  >
                    <i className="fas fa-user text-white text-4xl"></i>
                  </div>

                  {/* 등급 배지 */}
                  <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 shadow-sm">
                    <div className="flex items-center text-sm">
                      <i className="fas fa-star text-yellow-500 mr-1"></i>
                      <span className="font-semibold text-gray-800">
                        {instructor.rating}
                      </span>
                    </div>
                  </div>

                  {/* 강사명 오버레이 */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">
                      {instructor.name} 강사
                    </h3>
                    <p className="text-white opacity-90 text-sm">
                      {instructor.specialty}
                    </p>
                  </div>
                </div>

                {/* 강사 정보 */}
                <div className="p-6">
                  {/* 평점과 경력 */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      {renderStars(instructor.rating)}
                      <span className="ml-2 text-sm text-gray-600">
                        ({instructor.totalClasses})
                      </span>
                    </div>
                  </div>

                  {/* 경력 정보 */}
                  <div className="mb-3">
                    <p className="text-sm text-gray-600">
                      {instructor.experience}
                    </p>
                  </div>

                  {/* 설명 */}
                  <p className="text-gray-700 mb-4 text-sm line-clamp-2">
                    {instructor.description}
                  </p>

                  {/* 가격 정보 */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <h5 className="font-semibold text-sm mb-2">수업료</h5>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>개인레슨:</span>
                        <span className="font-semibold">
                          {formatPrice(instructor.price.personal)}원
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>그룹레슨:</span>
                        <span className="font-semibold">
                          {formatPrice(instructor.price.group)}원
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>온라인:</span>
                        <span className="font-semibold">
                          {formatPrice(instructor.price.online)}원
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 액션 버튼들 */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleProfileView(instructor)}
                      className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                    >
                      <i className="fas fa-user mr-2"></i>
                      프로필 보기
                    </button>
                    <button
                      onClick={() => handleBookingClick(instructor)}
                      className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    >
                      <i className="fas fa-calendar-plus mr-2"></i>
                      수업 예약
                    </button>
                  </div>

                  {/* 추가 정보 */}
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>총 수업: {instructor.totalClasses}</span>
                      <span>경력: {instructor.experience.split(" ")[0]}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 추가 안내 */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold mb-3">💡 수업 예약 안내</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <i className="fas fa-clock text-purple-600 mb-2"></i>
                  <p>수업 시간: 60분</p>
                </div>
                <div>
                  <i className="fas fa-calendar text-purple-600 mb-2"></i>
                  <p>예약 변경: 2시간 전까지</p>
                </div>
                <div>
                  <i className="fas fa-gift text-purple-600 mb-2"></i>
                  <p>첫 수업 20% 할인</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 예약 모달 */}
      {showBookingModal && selectedInstructor && (
        <BookingModal
          instructor={selectedInstructor}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedInstructor(null);
          }}
        />
      )}
    </>
  );
};

export default InstructorSection;
