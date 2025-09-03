import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../contexts/AppContext";

const RealTimeBooking = ({ showDetailedStats = false }) => {
  const [availableClasses, setAvailableClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, bookClass } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAvailableClasses();
    const interval = setInterval(fetchAvailableClasses, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchAvailableClasses = async () => {
    try {
      const mockClasses = [
        {
          id: 1,
          name: "심신 안정 명상 요가",
          instructor: "박*온",
          time: "14:00",
          available: 8,
          total: 15,
        },
        {
          id: 2,
          name: "하타 요가 기초",
          instructor: "김*련",
          time: "16:00",
          available: 5,
          total: 12,
        },
      ];
      setAvailableClasses(mockClasses);
      setLoading(false);
    } catch (error) {
      console.error("수업 정보 로드 실패:", error);
      setLoading(false);
    }
  };

  const handleQuickBook = async (classId) => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await bookClass(classId);
      alert("실시간 예약이 완료되었습니다!");
      fetchAvailableClasses();
    } catch (error) {
      alert("예약 실패. 다시 시도해주세요.");
    }
  };

  const handleLoginRedirect = () => {
    alert("로그인이 필요합니다.");
  };

  const handleStartYoga = () => {
    if (!user) {
      handleLoginRedirect();
    } else {
      navigate("/classes");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-md h-full">
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full mb-3">
          <i className="fas fa-clock text-white text-xl"></i>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          실시간 수업 예약
        </h3>
        <p className="text-gray-600 text-sm">
          언제 어디서나 원하는 시간에 요가 수업을 예약하고 참여하세요.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <i className="fas fa-spinner fa-spin text-2xl text-blue-500 mb-2"></i>
          <p className="text-sm text-gray-600">실시간 수업 정보 로딩중...</p>
        </div>
      ) : showDetailedStats && user ? (
        // 로그인 후 상세 정보 표시
        <div className="space-y-3">
          {availableClasses.map((cls) => (
            <div key={cls.id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-bold text-base mb-1">{cls.name}</h4>
                  <p className="text-sm text-gray-600 mb-1">
                    {cls.instructor} • {cls.time}
                  </p>
                  <p className="text-sm text-gray-500">
                    잔여: {cls.available}/{cls.total}
                  </p>
                </div>
                <button
                  onClick={() => handleQuickBook(cls.id)}
                  disabled={cls.available === 0}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    cls.available > 0
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {cls.available > 0 ? "예약" : "마감"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // 기본 간단한 정보 표시
        <div className="text-center py-8">
          <i className="fas fa-yoga text-4xl text-blue-500 mb-4"></i>
          <p className="text-gray-600 mb-4">
            로그인하시면 실시간 수업 예약 정보를
            <br />
            확인하실 수 있습니다.
          </p>
          <button
            onClick={handleStartYoga}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            {user ? "수업 보기" : "로그인하기"}
          </button>
        </div>
      )}
    </div>
  );
};

export default RealTimeBooking;
