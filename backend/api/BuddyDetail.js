import axios from "axios";
import { useEffect, useState } from "react";

const BuddyDetail = ({ buddyId }) => {
  const [buddy, setBuddy] = useState(null);

  useEffect(() => {
    const fetchBuddy = async () => {
      try {
        const res = await axios.get(`/api/buddies/${buddyId}`);
        setBuddy(res.data);
      } catch (err) {
        console.error("버디 상세 불러오기 실패:", err);
      }
    };
    fetchBuddy();
  }, [buddyId]);

  const handleJoin = async () => {
    try {
      await axios.post(`/api/buddies/${buddyId}/join`);
      alert("참여 신청 완료!");
      // 다시 상세 데이터 불러오기
      const res = await axios.get(`/api/buddies/${buddyId}`);
      setBuddy(res.data);
    } catch (err) {
      console.error("참여 실패:", err);
    }
  };

  if (!buddy) return <p>불러오는 중...</p>;

  return (
    <div className="p-4 border rounded space-y-2">
      <h2 className="font-bold text-xl">{buddy.title}</h2>
      <p>지역: {buddy.location}</p>
      <p>스타일: {buddy.style}</p>
      <p>시간: {buddy.time}</p>
      <p>모집 인원: {buddy.maxParticipants}</p>
      <p>참여자: {buddy.participants?.join(", ") || "없음"}</p>
      <button
        onClick={handleJoin}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        참여하기
      </button>
    </div>
  );
};

export default BuddyDetail;
