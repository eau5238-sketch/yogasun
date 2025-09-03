// src/components/classes/ClassCard.js

import React from "react";

/**
 * 클래스 또는 명상 세션을 카드 형태로 표시하는 재사용 가능한 컴포넌트입니다.
 * @param {{item: object}} props - 클래스 데이터를 담고 있는 객체입니다.
 * @param {string} props.item.name - 클래스 이름.
 * @param {string} props.item.instructor - 강사 이름.
 * @param {string} props.item.image - 클래스 이미지 URL.
 * @param {string} props.item.category - 클래스 카테고리.
 * @param {string} props.item.description - 클래스 설명.
 * @param {string} props.item.level - 난이도.
 * @param {string} props.item.duration - 소요 시간.
 * @param {number} [props.item.rating] - 평점 (선택 사항).
 * @param {function} [props.onClick] - 카드 클릭 핸들러 (선택 사항).
 */
const ClassCard = ({ item, onClick }) => {
  const handleCardClick = () => {
    if (onClick) {
      onClick(item);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${
        onClick
          ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          : ""
      }`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
      aria-label={onClick ? `${item.name} 클래스 선택` : undefined}
    >
      <div className="relative">
        <img
          src={item.image}
          alt={`${item.name} 클래스 이미지`}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/400x300/9333ea/ffffff?text=${encodeURIComponent(
              item.name
            )}`;
          }}
        />
        <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
          {item.category}
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 flex-1 mr-2">
            {item.name}
          </h3>
          {item.rating && (
            <div className="flex items-center text-yellow-400 flex-shrink-0">
              {/* 평점 별 아이콘 */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 fill-current"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.173 3.61c.19.584.722.95 1.332.95h3.812c.963 0 1.37.584.975 1.5l-3.09 2.246c-.51.372-.71.97-.52 1.528l1.174 3.61c.3.921-.437 1.673-1.282 1.155l-3.09-2.246c-.51-.372-1.242-.372-1.752 0l-3.09 2.246c-.845.518-1.582-.234-1.282-1.155l1.174-3.61c.19-.558-.01-1.156-.52-1.528L1.65 8.987c-.395-.916.012-1.5 1.282-1.5h3.812c.61 0 1.142-.366 1.332-.95l1.173-3.61z" />
              </svg>
              <span
                className="ml-1 text-sm text-gray-600"
                aria-label={`평점 ${item.rating}점`}
              >
                {item.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center text-sm text-gray-500 space-x-2 mb-3">
          {/* 강사 아이콘 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500 fill-current"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
          <span>{item.instructor}</span>
        </div>

        <p
          className="text-gray-700 text-sm mb-4 overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {item.description}
        </p>

        <div className="flex justify-between items-center text-sm font-semibold text-gray-600">
          <span className="flex items-center space-x-1">
            {/* 난이도 아이콘 */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-purple-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3 10a1 1 0 011-1h4V6a1 1 0 112 0v3h4a1 1 0 110 2h-4v3a1 1 0 11-2 0v-3H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{item.level}</span>
          </span>

          <span className="flex items-center space-x-1">
            {/* 시계 아이콘 */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-purple-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span>{item.duration}</span>
          </span>
        </div>

        {/* 영상보기 버튼 추가 */}
        {item.hasVideo && (
          <div className="mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (item.videoUrl) {
                  window.open(item.videoUrl, '_blank');
                } else {
                  alert('영상 링크가 준비 중입니다.');
                }
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>영상보기</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassCard;
