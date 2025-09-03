import React, { useState } from "react";
import YouTubePlayer from "./YouTubePlayer";

const VideoCard = ({ video, onPlay, onVideoView }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFullVideo, setShowFullVideo] = useState(false);

  const handlePlayClick = () => {
    if (onPlay) {
      onPlay(video);
    } else {
      setIsPlaying(true);
      // 비디오 시청 기록 (선택사항)
      if (onVideoView && video.videoId) {
        onVideoView(video.videoId, video.duration);
      }
    }
  };

  const handleCloseVideo = () => {
    setIsPlaying(false);
    setShowFullVideo(false);
  };

  const handleFullScreen = () => {
    setShowFullVideo(true);
  };

  // 썸네일 URL 생성
  const getThumbnailUrl = (videoId) => {
    if (!videoId) return "";
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  // 기본 썸네일 이미지
  const getDefaultThumbnail = () => {
    return "https://via.placeholder.com/480x360/6B46C1/FFFFFF?text=YouTube+Video";
  };

  // 레벨 배지 컴포넌트
  const LevelBadge = ({ level }) => {
    const getLevelInfo = (level) => {
      const levels = {
        beginner: { name: "초급", color: "bg-green-100 text-green-800" },
        intermediate: { name: "중급", color: "bg-yellow-100 text-yellow-800" },
        advanced: { name: "고급", color: "bg-red-100 text-red-800" },
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

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 card">
        <div className="relative group">
          {!isPlaying ? (
            // 썸네일 표시
            <div className="relative">
              <img
                src={
                  video.thumbnail ||
                  getThumbnailUrl(video.videoId || video.youtubeId)
                }
                alt={video.title || "YouTube 비디오"}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = getDefaultThumbnail();
                }}
              />

              {/* 재생 버튼 오버레이 */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={handlePlayClick}
                  className="bg-red-600 text-white p-4 rounded-full hover:bg-red-700 transition-colors duration-300 transform hover:scale-110"
                  aria-label="동영상 재생"
                >
                  <i className="fas fa-play text-xl ml-1"></i>
                </button>
              </div>

              {/* 재생 시간 표시 */}
              {video.duration && (
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
              )}
            </div>
          ) : (
            // 동영상 플레이어 표시
            <div className="relative">
              <div className="video-responsive">
                <YouTubePlayer
                  videoId={video.videoId || video.youtubeId}
                  title={video.title}
                  autoplay={true}
                />
              </div>

              {/* 닫기 버튼 */}
              <button
                onClick={handleCloseVideo}
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 z-20 transition-all"
                aria-label="동영상 닫기"
              >
                <i className="fas fa-times"></i>
              </button>

              {/* 전체화면 버튼 */}
              <button
                onClick={handleFullScreen}
                className="absolute top-2 left-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 z-20 transition-all"
                aria-label="전체화면"
              >
                <i className="fas fa-expand"></i>
              </button>
            </div>
          )}
        </div>

        {/* 비디오 정보 */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {video.title || "제목 없음"}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {video.description || "설명이 없습니다."}
          </p>

          <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
            <span>
              <i className="fas fa-user mr-1"></i>
              {video.instructor || "강사 미정"}
            </span>
            <span>
              <i className="fas fa-clock mr-1"></i>
              {video.duration || "-"}
            </span>
            <LevelBadge level={video.level || "beginner"} />
          </div>

          {/* 추가 액션 버튼들 */}
          <div className="flex space-x-2">
            <button
              onClick={handlePlayClick}
              className="flex-1 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors font-medium"
            >
              <i className="fas fa-play mr-2"></i>
              시청하기
            </button>
            <button
              className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              aria-label="북마크"
            >
              <i className="fas fa-bookmark"></i>
            </button>
            <button
              className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              aria-label="공유"
            >
              <i className="fas fa-share"></i>
            </button>
          </div>
        </div>
      </div>

      {/* 전체화면 모달 */}
      {showFullVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="relative w-full max-w-6xl mx-4">
            <button
              onClick={() => setShowFullVideo(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl z-10"
              aria-label="전체화면 닫기"
            >
              <i className="fas fa-times"></i>
            </button>

            <div className="relative pt-[56.25%]">
              {" "}
              {/* 16:9 비율 */}
              <div className="absolute inset-0">
                <YouTubePlayer
                  videoId={video.videoId || video.youtubeId}
                  title={video.title}
                  autoplay={true}
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoCard;
