import React, { useState, useEffect } from "react";

const BookingModal = ({
  isOpen,
  onClose,
  classInfo,
  instructor, // InstructorSection에서 전달받는 강사 정보
}) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [participants, setParticipants] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");
  const [classType, setClassType] = useState("group"); // 개인/그룹/온라인 레슨 타입
  const [loading, setLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  // 컴포넌트가 열릴 때마다 초기화
  useEffect(() => {
    if (isOpen) {
      setSelectedDate("");
      setSelectedTime("");
      setParticipants(1);
      setSpecialRequests("");
      setClassType("group");
      setLoading(false);
    }
  }, [isOpen]);

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      alert("날짜와 시간을 선택해주세요.");
      return;
    }

    setLoading(true);
    try {
      // 예약 API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 가격 계산
      const price = calculatePrice();

      // 예약 완료 알림
      alert(
        `예약이 완료되었습니다!\n\n` +
          `수업: ${getClassTitle()}\n` +
          `강사: ${getInstructorName()}\n` +
          `날짜: ${formatDate(selectedDate)}\n` +
          `시간: ${selectedTime}\n` +
          `수업 타입: ${getClassTypeLabel()}\n` +
          `인원: ${participants}명\n` +
          `총 금액: ${formatPrice(price)}원`
      );

      // 폼 초기화 및 모달 닫기
      resetForm();
      onClose();
    } catch (error) {
      alert("예약 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedDate("");
    setSelectedTime("");
    setParticipants(1);
    setSpecialRequests("");
    setClassType("group");
  };

  // 강사 정보 가져오기
  const getInstructorName = () => {
    return instructor?.name || classInfo?.instructor || "요가 강사";
  };

  const getClassTitle = () => {
    return classInfo?.title || instructor?.specialty || "요가 수업";
  };

  // 수업 타입별 가격 계산
  const calculatePrice = () => {
    if (!instructor?.price) {
      const defaultPrices = { personal: 50000, group: 25000, online: 15000 };
      return defaultPrices[classType] * participants;
    }

    let basePrice = instructor.price[classType] || 25000;

    // 개인 레슨이 아닌 경우 인원수만큼 곱하기
    if (classType !== "personal") {
      basePrice *= participants;
    }

    return basePrice;
  };

  const getClassTypeLabel = () => {
    const labels = {
      personal: "개인 레슨",
      group: "그룹 레슨",
      online: "온라인 레슨",
    };
    return labels[classType];
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    const dayName = dayNames[date.getDay()];
    return `${dateString} (${dayName})`;
  };

  // 오늘부터 30일간의 날짜 생성
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // 주말 제외하고 싶은 경우 (선택사항)
      // if (date.getDay() === 0 || date.getDay() === 6) continue;

      dates.push(date.toISOString().split("T")[0]);
    }

    return dates;
  };

  // 캘린더 날짜 생성
  const getCalendarDates = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const dates = [];
    const today = new Date();

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const dateString = date.toISOString().split("T")[0];
      const isCurrentMonth = date.getMonth() === month;
      const isPast = date < today.setHours(0, 0, 0, 0);
      const isSelected = selectedDate === dateString;

      dates.push({
        date: date.getDate(),
        dateString,
        isCurrentMonth,
        isPast,
        isSelected,
        isAvailable: !isPast && isCurrentMonth,
      });
    }

    return dates;
  };

  const availableTimes = [
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];

  // 모달이 닫혀있으면 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">수업 예약</h3>
            <p className="text-sm text-gray-600 mt-1">
              {getInstructorName()}님의 {getClassTitle()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* 수업 정보 */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
            <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
              <i className="fas fa-info-circle mr-2"></i>
              선택한 수업 정보
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-purple-700 font-medium">{getClassTitle()}</p>
                <p className="text-purple-600">강사: {getInstructorName()}</p>
                {classInfo?.duration && (
                  <p className="text-purple-600">
                    수업 시간: {classInfo.duration}
                  </p>
                )}
              </div>
              {instructor && (
                <div>
                  <p className="text-purple-600">
                    경력: {instructor.experience}
                  </p>
                  <p className="text-purple-600">
                    평점: ⭐ {instructor.rating}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 수업 타입 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              수업 타입 선택 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  value: "personal",
                  label: "개인 레슨",
                  icon: "fas fa-user",
                  desc: "1:1 맞춤 수업",
                },
                {
                  value: "group",
                  label: "그룹 레슨",
                  icon: "fas fa-users",
                  desc: "소규모 그룹 수업",
                },
                {
                  value: "online",
                  label: "온라인 레슨",
                  icon: "fas fa-laptop",
                  desc: "화상 수업",
                },
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() => setClassType(type.value)}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    classType === type.value
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <i className={`${type.icon} text-lg mb-2`}></i>
                  <div className="font-medium">{type.label}</div>
                  <div className="text-xs text-gray-500">{type.desc}</div>
                  {instructor?.price && (
                    <div className="text-sm font-semibold mt-1">
                      {formatPrice(instructor.price[type.value])}원
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 날짜 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              날짜 선택 <span className="text-red-500">*</span>
            </label>

            <div className="space-y-3">
              {/* 드롭다운 방식 */}
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">날짜를 선택하세요</option>
                {getAvailableDates().map((date) => (
                  <option key={date} value={date}>
                    {formatDate(date)}
                  </option>
                ))}
              </select>

              {/* 캘린더 토글 버튼 */}
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="text-sm text-purple-600 hover:text-purple-700 flex items-center"
              >
                <i className="fas fa-calendar-alt mr-2"></i>
                {showCalendar ? "캘린더 닫기" : "캘린더로 선택하기"}
              </button>

              {/* 캘린더 뷰 */}
              {showCalendar && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <button
                      onClick={() =>
                        setCurrentMonth(
                          new Date(
                            currentMonth.setMonth(currentMonth.getMonth() - 1)
                          )
                        )
                      }
                      className="p-2 hover:bg-gray-100 rounded"
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <h4 className="font-medium">
                      {currentMonth.getFullYear()}년{" "}
                      {currentMonth.getMonth() + 1}월
                    </h4>
                    <button
                      onClick={() =>
                        setCurrentMonth(
                          new Date(
                            currentMonth.setMonth(currentMonth.getMonth() + 1)
                          )
                        )
                      }
                      className="p-2 hover:bg-gray-100 rounded"
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                      <div key={day} className="font-medium text-gray-500 p-2">
                        {day}
                      </div>
                    ))}

                    {getCalendarDates().map((dateObj, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          dateObj.isAvailable &&
                          setSelectedDate(dateObj.dateString)
                        }
                        disabled={!dateObj.isAvailable}
                        className={`p-2 text-sm rounded ${
                          dateObj.isSelected
                            ? "bg-purple-600 text-white"
                            : dateObj.isAvailable
                            ? "hover:bg-purple-100 text-gray-700"
                            : "text-gray-300 cursor-not-allowed"
                        } ${!dateObj.isCurrentMonth ? "text-gray-300" : ""}`}
                      >
                        {dateObj.date}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 시간 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              시간 선택 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 text-sm rounded-lg border transition-all ${
                    selectedTime === time
                      ? "bg-purple-600 text-white border-purple-600 shadow-lg"
                      : "bg-white text-gray-700 border-gray-300 hover:border-purple-500 hover:bg-purple-50"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* 참가 인원 (개인 레슨이 아닌 경우에만) */}
          {classType !== "personal" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                참가 인원
              </label>
              <select
                value={participants}
                onChange={(e) => setParticipants(parseInt(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}명
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 특별 요청사항 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              특별 요청사항 (선택사항)
            </label>
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="특별한 요청사항이나 건강상 주의사항이 있으시면 입력해주세요"
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
          </div>

          {/* 예약 정보 요약 */}
          {selectedDate && selectedTime && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                <i className="fas fa-check-circle mr-2"></i>
                예약 정보 확인
              </h4>
              <div className="grid md:grid-cols-2 gap-3 text-sm text-green-700">
                <div>
                  <p>
                    <span className="font-medium">수업:</span> {getClassTitle()}
                  </p>
                  <p>
                    <span className="font-medium">강사:</span>{" "}
                    {getInstructorName()}
                  </p>
                  <p>
                    <span className="font-medium">날짜:</span>{" "}
                    {formatDate(selectedDate)}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-medium">시간:</span> {selectedTime}
                  </p>
                  <p>
                    <span className="font-medium">타입:</span>{" "}
                    {getClassTypeLabel()}
                  </p>
                  {classType !== "personal" && (
                    <p>
                      <span className="font-medium">인원:</span> {participants}
                      명
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-green-200">
                <p className="text-lg font-bold text-green-800">
                  총 금액: {formatPrice(calculatePrice())}원
                </p>
              </div>
            </div>
          )}

          {/* 예약 안내 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-3 flex items-center">
              <i className="fas fa-info-circle mr-2"></i>
              예약 안내사항
            </h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <i className="fas fa-clock w-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0"></i>
                예약은 수업 시작 2시간 전까지 가능합니다.
              </li>
              <li className="flex items-start">
                <i className="fas fa-calendar-times w-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0"></i>
                예약 취소는 수업 시작 24시간 전까지 가능합니다.
              </li>
              <li className="flex items-start">
                <i className="fas fa-running w-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0"></i>
                수업 시작 10분 전까지 도착해주세요.
              </li>
              <li className="flex items-start">
                <i className="fas fa-tshirt w-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0"></i>
                요가매트와 수건을 준비해주세요.
              </li>
            </ul>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex gap-4 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
          >
            취소
          </button>
          <button
            onClick={handleBooking}
            disabled={loading || !selectedDate || !selectedTime}
            className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                예약 중...
              </div>
            ) : (
              <>
                <i className="fas fa-check mr-2"></i>
                예약하기 ({formatPrice(calculatePrice())}원)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
