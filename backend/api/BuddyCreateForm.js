import axios from "axios";
import { useState } from "react";

const BuddyCreateForm = ({ onCreated }) => {
  const [newBuddy, setNewBuddy] = useState({
    title: "",
    location: "",
    style: "",
    time: "",
    maxParticipants: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/buddies", newBuddy);
      setNewBuddy({
        title: "",
        location: "",
        style: "",
        time: "",
        maxParticipants: 1,
      });
      onCreated(); // 목록 갱신
    } catch (err) {
      console.error("버디 등록 실패:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded">
      <input
        type="text"
        placeholder="제목"
        value={newBuddy.title}
        onChange={(e) => setNewBuddy({ ...newBuddy, title: e.target.value })}
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="지역"
        value={newBuddy.location}
        onChange={(e) => setNewBuddy({ ...newBuddy, location: e.target.value })}
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="요가 스타일"
        value={newBuddy.style}
        onChange={(e) => setNewBuddy({ ...newBuddy, style: e.target.value })}
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="시간대"
        value={newBuddy.time}
        onChange={(e) => setNewBuddy({ ...newBuddy, time: e.target.value })}
        className="border p-2 w-full"
      />
      <input
        type="number"
        placeholder="모집 인원"
        value={newBuddy.maxParticipants}
        onChange={(e) =>
          setNewBuddy({ ...newBuddy, maxParticipants: Number(e.target.value) })
        }
        className="border p-2 w-full"
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded">
        등록
      </button>
    </form>
  );
};

export default BuddyCreateForm;
