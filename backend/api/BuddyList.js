import axios from "axios";
import { useEffect, useState } from "react";

const BuddyList = () => {
  const [buddies, setBuddies] = useState([]);

  const fetchBuddies = async () => {
    try {
      const res = await axios.get("/api/buddies");
      setBuddies(res.data);
    } catch (err) {
      console.error("버디 목록 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchBuddies();
  }, []);

  return (
    <div className="space-y-4">
      {buddies.map((buddy) => (
        <div key={buddy.id} className="border p-4 rounded">
          <h3 className="font-bold">{buddy.title}</h3>
          <p>지역: {buddy.location}</p>
          <p>스타일: {buddy.style}</p>
          <p>시간: {buddy.time}</p>
          <p>모집 인원: {buddy.maxParticipants}</p>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
            onClick={() => alert(`참여 신청: ${buddy.title}`)}
          >
            참여하기
          </button>
        </div>
      ))}
    </div>
  );
};

export default BuddyList;
