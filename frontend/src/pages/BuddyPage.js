import React, { useState, useEffect } from "react";
import axios from "axios";

const BuddyPage = () => {
  const [buddies, setBuddies] = useState([]);
  const [newBuddy, setNewBuddy] = useState({
    title: "",
    location: "",
    style: "",
  });

  // 버디 목록 불러오기
  useEffect(() => {
    fetchBuddies();
  }, []);

  const fetchBuddies = async () => {
    try {
      const res = await axios.get("/api/buddies");
      setBuddies(res.data);
    } catch (err) {
      console.error("버디 불러오기 실패:", err);
    }
  };

  // 모집 글 등록
  const handleCreateBuddy = async () => {
    try {
      await axios.post("/api/buddies", newBuddy);
      setNewBuddy({ title: "", location: "", style: "" });
      fetchBuddies();
    } catch (err) {
      console.error("버디 등록 실패:", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">버디 찾기</h1>

      {/* 모집 글 작성 */}
      <div className="mb-6 p-4 border rounded">
        <input
          type="text"
          placeholder="제목"
          value={newBuddy.title}
          onChange={(e) => setNewBuddy({ ...newBuddy, title: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="지역"
          value={newBuddy.location}
          onChange={(e) =>
            setNewBuddy({ ...newBuddy, location: e.target.value })
          }
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="요가 스타일"
          value={newBuddy.style}
          onChange={(e) => setNewBuddy({ ...newBuddy, style: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={handleCreateBuddy}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          모집 글 등록
        </button>
      </div>

      {/* 모집 글 목록 */}
      <div>
        {buddies.map((buddy) => (
          <div key={buddy.id} className="border p-4 mb-2 rounded">
            <h2 className="text-lg font-semibold">{buddy.title}</h2>
            <p>지역: {buddy.location}</p>
            <p>스타일: {buddy.style}</p>
            <button className="bg-blue-500 text-white px-3 py-1 rounded mt-2">
              참여하기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuddyPage;
