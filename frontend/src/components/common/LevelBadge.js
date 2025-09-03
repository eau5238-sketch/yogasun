import React from "react";

const LevelBadge = ({ level }) => {
  const getLevelInfo = (level) => {
    const levels = {
      beginner: {
        name: "초급",
        color: "bg-green-100 text-green-800",
      },
      intermediate: {
        name: "중급",
        color: "bg-yellow-100 text-yellow-800",
      },
      advanced: {
        name: "고급",
        color: "bg-red-100 text-red-800",
      },
      all: {
        name: "모든레벨",
        color: "bg-blue-100 text-blue-800",
      },
    };
    return levels[level] || levels.beginner;
  };

  const levelInfo = getLevelInfo(level);

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${levelInfo.color}`}
    >
      {levelInfo.name}
    </span>
  );
};

export default LevelBadge;
