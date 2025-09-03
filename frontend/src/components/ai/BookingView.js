import React, { useState, useEffect } from "react";
import "./BookingView.css";

const BookingView = ({ bookingData, onBookingUpdate, onBookingCancel }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    patientName: "",
    phoneNumber: "",
    email: "",
    reason: "",
    notes: "",
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // AI 추천 시스템에서 받은 예약 데이터 처리
    if (bookingData) {
      setAvailableSlots(bookingData.availableSlots || []);
      setBookingDetails((prev) => ({
        ...prev,
        ...bookingData.patientInfo,
      }));
    }
  }, [bookingData]);

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  const handleInputChange = (field, value) => {
    setBookingDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBookingSubmit = async () => {
    if (!selectedSlot) {
      alert("예약 시간을 선택해주세요.");
      return;
    }

    if (!bookingDetails.patientName || !bookingDetails.phoneNumber) {
      alert("필수 정보를 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const bookingRequest = {
        slot: selectedSlot,
        patientInfo: bookingDetails,
        timestamp: new Date().toISOString(),
      };

      // API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (onBookingUpdate) {
        onBookingUpdate(bookingRequest);
      }

      alert("예약이 성공적으로 완료되었습니다!");
    } catch (error) {
      console.error("예약 실패:", error);
      alert("예약 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-view">
      <div className="booking-header">
        <h2>AI 추천 예약</h2>
        <p>AI가 분석한 최적의 예약 시간을 확인하고 예약을 진행하세요.</p>
      </div>

      {/* 추천 시간대 표시 */}
      <div className="recommended-slots">
        <h3>추천 예약 시간</h3>
        <div className="slots-grid">
          {availableSlots.map((slot, index) => (
            <div
              key={index}
              className={`slot-item ${
                selectedSlot?.id === slot.id ? "selected" : ""
              }`}
              onClick={() => handleSlotSelection(slot)}
            >
              <div className="slot-time">
                {slot.date} {slot.time}
              </div>
              <div className="slot-info">
                <span className="doctor-name">{slot.doctorName}</span>
                <span className="availability">
                  {slot.available ? "예약 가능" : "예약 불가"}
                </span>
              </div>
              {slot.aiRecommendation && (
                <div className="ai-recommendation">
                  <span className="ai-tag">AI 추천</span>
                  <span className="recommendation-reason">
                    {slot.aiRecommendation}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 환자 정보 입력 */}
      <div className="patient-info">
        <h3>환자 정보</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>환자명 *</label>
            <input
              type="text"
              value={bookingDetails.patientName}
              onChange={(e) => handleInputChange("patientName", e.target.value)}
              placeholder="환자명을 입력해주세요"
            />
          </div>

          <div className="form-group">
            <label>연락처 *</label>
            <input
              type="tel"
              value={bookingDetails.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              placeholder="연락처를 입력해주세요"
            />
          </div>

          <div className="form-group">
            <label>이메일</label>
            <input
              type="email"
              value={bookingDetails.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="이메일을 입력해주세요"
            />
          </div>

          <div className="form-group full-width">
            <label>진료 사유</label>
            <input
              type="text"
              value={bookingDetails.reason}
              onChange={(e) => handleInputChange("reason", e.target.value)}
              placeholder="진료 사유를 입력해주세요"
            />
          </div>

          <div className="form-group full-width">
            <label>추가 메모</label>
            <textarea
              value={bookingDetails.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="추가 메모사항이 있으면 입력해주세요"
              rows="3"
            />
          </div>
        </div>
      </div>

      {/* 예약 액션 버튼 */}
      <div className="booking-actions">
        <button
          className="cancel-btn"
          onClick={onBookingCancel}
          disabled={loading}
        >
          취소
        </button>
        <button
          className="confirm-btn"
          onClick={handleBookingSubmit}
          disabled={loading || !selectedSlot}
        >
          {loading ? "예약 중..." : "예약 확정"}
        </button>
      </div>
    </div>
  );
};

export default BookingView;
