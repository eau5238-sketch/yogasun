import React, { useState, useEffect } from "react";
import { useApp } from "../components/contexts/AppContext";
import { useNavigate } from "react-router-dom";

const InstructorsPage = () => {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([]); // 빈 배열로 초기화
  const [loading, setLoading] = useState(true);
  const { user } = useApp();

  useEffect(() => {
    // 더미 강사 데이터 (실제 요가 강사 이미지 포함)
    const mockInstructors = [
      {
        id: 1,
        name: "박*온",
        specialty: "명상 요가",
        experience: "5년",
        description: "스트레스 해소와 마음의 평안을 위한 명상 요가 전문가",
        image:
          "https://www.shutterstock.com/image-photo/serene-indian-ethnicity-woman-sit-260nw-2070561431.jpg",
        qualifications: ["요가 지도자 자격증", "명상 지도사"],
        classes: ["심신 안정 명상 요가"],
      },
      {
        id: 2,
        name: "김*련",
        specialty: "하타 요가",
        experience: "7년",
        description: "요가의 기본기를 탄탄하게 다져주는 하타 요가 전문가",
        image:
          "https://www.shutterstock.com/image-photo/young-female-yoga-teacher-smiling-260nw-2458502889.jpg",
        qualifications: ["국제 요가 지도자 자격증", "해부학 수료"],
        classes: ["하타 요가 기초"],
      },
      {
        id: 3,
        name: "이*연",
        specialty: "빈야사 플로우",
        experience: "6년",
        description: "흐르는 듯한 동작으로 몸과 마음을 연결하는 빈야사 전문가",
        image:
          "https://www.shutterstock.com/image-photo/happy-fit-young-hispanic-woman-260nw-2476032295.jpg",
        qualifications: ["빈야사 요가 전문 지도자", "요가 철학 수료"],
        classes: ["빈야사 플로우"],
      },
      {
        id: 4,
        name: "강*력",
        specialty: "파워 요가",
        experience: "8년",
        description: "체력과 근력을 기르는 강도 높은 요가 수업 전문가",
        image:
          "https://www.shutterstock.com/image-photo/trainer-teaching-yoga-pose-posture-260nw-2286247559.jpg",
        qualifications: ["파워 요가 전문 지도자", "피트니스 트레이너"],
        classes: ["파워 요가"],
      },
      {
        id: 5,
        name: "정*음",
        specialty: "아이엔가 요가",
        experience: "9년",
        description: "정확한 자세와 정렬을 중시하는 아이엔가 요가 전문가",
        image:
          "https://www.shutterstock.com/image-photo/female-yoga-instructor-helping-her-260nw-2296255515.jpg",
        qualifications: ["아이엔가 요가 인증 지도자", "요가 해부학 전문가"],
        classes: ["아이엔가 요가", "요가 교정"],
      },
      {
        id: 6,
        name: "한*요",
        specialty: "음 요가",
        experience: "4년",
        description: "깊은 이완과 스트레칭을 위한 음 요가 전문가",
        image:
          "https://i.pinimg.com/736x/da/2a/43/da2a435e033cadfab6e365b0a5c69b13.jpg",
        qualifications: ["음 요가 지도자", "태국 마사지 테라피스트"],
        classes: ["음 요가", "회복 요가"],
      },
    ];

    const loadInstructors = () => {
      setLoading(true);
      setTimeout(() => {
        setInstructors(mockInstructors);
        setLoading(false);
      }, 500);
    };

    loadInstructors();
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">전문 강사진</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            풍부한 경험과 전문성을 갖춘 요가 강사들을 만나보세요
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors && instructors.length > 0 ? (
            instructors.map((instructor) => (
              <div
                key={instructor.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x300/4ade80/ffffff?text=${instructor.name}`;
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getSpecialtyColor(
                        instructor.specialty
                      )}`}
                    >
                      {instructor.specialty}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {instructor.name} 강사
                    </h3>
                    <div className="flex items-center mb-2">
                      <i className="fas fa-award text-green-500 mr-2"></i>
                      <span className="text-gray-600 text-sm">
                        경력 {instructor.experience}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {instructor.description}
                    </p>
                  </div>

                  <div className="mb-4">
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <i className="fas fa-certificate text-green-500 mr-2"></i>
                        자격증
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {instructor.qualifications?.map((qual, index) => (
                          <span
                            key={index}
                            className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded border border-green-200"
                          >
                            {qual}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <i className="fas fa-chalkboard-teacher text-green-500 mr-2"></i>
                      담당 수업
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {instructor.classes?.map((className, index) => (
                        <span
                          key={index}
                          className="bg-gray-50 text-gray-700 text-xs px-2 py-1 rounded border border-gray-200"
                        >
                          {className}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/instructors/${instructor.id}`)}
                      className="flex-1 bg-green-700 hover:bg-green-700 text-white py-4 px-7 rounded-lg transition-colors font-medium text-lg"
                    >
                      <i className="fas fa-user mr-7"></i>
                      프로필 보기
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <i className="fas fa-user-friends text-4xl text-gray-400 mb-4"></i>
              <p className="text-gray-500">강사 정보가 없습니다.</p>
            </div>
          )}
        </div>
        강사 통계 섹션
        <div className="grid md:grid-cols-3 gap-8 mt-16 mb-12">
          {/* 전문 강사진 */}
          <div className="bg-purple-400 rounded-lg p-8 text-center shadow-lg">
            <div className="text-5xl font-extrabold text-white mb-2">
              {instructors.length}+
            </div>
            <p className="text-xl text-white">전문 강사진</p>
          </div>

          {/* 다양한 요가 스타일 */}
          <div className="bg-pink-400 rounded-lg p-8 text-center shadow-lg">
            <div className="text-5xl font-extrabold text-white mb-2">15+</div>
            <p className="text-xl text-white">다양한 요가 스타일</p>
          </div>

          {/* 만족한 수강생 */}
          <div className="bg-blue-400 rounded-lg p-8 text-center shadow-lg">
            <div className="text-5xl font-extrabold text-white mb-2">1000+</div>
            <p className="text-xl text-white">만족한 수강생</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstructorsPage;
