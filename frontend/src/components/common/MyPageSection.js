import React, { useState } from "react";

const MyPageSection = () => {
  const [profile, setProfile] = useState({
    name: "김*가",
    email: "yoga@example.com",
    level: "초급",
  });

  const [bookedClasses] = useState([
    {
      id: 1,
      type: "빈야사 요가",
      instructor: "소연 강사",
      date: "2025.08.15",
      time: "10:00",
      color: "border-purple-500",
    },
    {
      id: 2,
      type: "하타 요가",
      instructor: "현수 강사",
      date: "2025.08.17",
      time: "14:00",
      color: "border-blue-500",
    },
  ]);

  const [stats] = useState({
    totalClasses: 24,
    monthlyClasses: 8,
    favoriteType: "빈야사",
    totalHours: 36,
  });

  const handleProfileUpdate = () => {
    // 프로필 업데이트 로직
    alert("프로필이 수정되었습니다.");
  };

  return (
    <section id="mypage" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">마이페이지</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* 프로필 정보 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">프로필 정보</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">이름</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">이메일</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  요가 레벨
                </label>
                <select
                  value={profile.level}
                  onChange={(e) =>
                    setProfile({ ...profile, level: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                >
                  <option>초급</option>
                  <option>중급</option>
                  <option>고급</option>
                </select>
              </div>
              <button
                onClick={handleProfileUpdate}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 w-full"
              >
                프로필 수정
              </button>
            </div>
          </div>

          {/* 예약된 수업 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">예약된 수업</h3>
            <div className="space-y-3">
              {bookedClasses.map((classItem) => (
                <div
                  key={classItem.id}
                  className={`border-l-4 ${classItem.color} pl-4 py-2`}
                >
                  <h4 className="font-medium">{classItem.type}</h4>
                  <p className="text-sm text-gray-600">
                    {classItem.instructor} - {classItem.date} {classItem.time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 수업 통계 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">수업 통계</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>총 수업 횟수</span>
                <span className="font-semibold">{stats.totalClasses}회</span>
              </div>
              <div className="flex justify-between">
                <span>이번 달 수업</span>
                <span className="font-semibold">{stats.monthlyClasses}회</span>
              </div>
              <div className="flex justify-between">
                <span>선호 요가 타입</span>
                <span className="font-semibold">{stats.favoriteType}</span>
              </div>
              <div className="flex justify-between">
                <span>총 운동 시간</span>
                <span className="font-semibold">{stats.totalHours}시간</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyPageSection;
