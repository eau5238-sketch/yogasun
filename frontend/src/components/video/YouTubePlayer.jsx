import React, { useState } from "react";

const YouTubePlayer = ({
  videoId,
  title,
  autoplay = false,
  width = "100%",
  height = "315",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // YouTube URL 생성
  const getYouTubeEmbedUrl = (videoId) => {
    if (!videoId) return "";

    const baseUrl = "https://www.youtube.com/embed/";
    const params = new URLSearchParams({
      rel: "0", // 관련 동영상 숨김
      modestbranding: "1", // YouTube 로고 최소화
      autoplay: autoplay ? "1" : "0",
      controls: "1", // 컨트롤 표시
      fs: "1", // 전체화면 허용
      iv_load_policy: "3", // 주석 숨김
      origin: window.location.origin, // CORS 문제 해결
    });

    return `${baseUrl}${videoId}?${params.toString()}`;
  };

  // 동영상 썸네일 URL
  const getThumbnailUrl = (videoId) => {
    if (!videoId) return "";
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
  };

  // videoId가 없는 경우 에러 처리
  if (!videoId) {
    return (
      <div
        className="relative bg-gray-900 text-white flex items-center justify-center"
        style={{ width, height }}
      >
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-4xl mb-2"></i>
          <p className="text-sm">동영상 ID가 없습니다</p>
        </div>
      </div>
    );
  }

  // 에러 상태 렌더링
  if (hasError) {
    return (
      <div
        className="relative bg-gray-900 text-white flex items-center justify-center"
        style={{ width, height }}
      >
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-4xl mb-2"></i>
          <p className="text-sm mb-2">동영상을 불러올 수 없습니다</p>
          <button
            onClick={handleRetry}
            className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ width, height }}>
      {/* 로딩 상태 */}
      {isLoading && (
        <div
          className="absolute inset-0 bg-gray-200 flex items-center justify-center z-10"
          style={{ width, height }}
        >
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mb-2"></div>
            <p className="text-sm text-gray-600">동영상 로딩 중...</p>
          </div>
        </div>
      )}

      {/* YouTube iframe */}
      <iframe
        width={width}
        height={height}
        src={getYouTubeEmbedUrl(videoId)}
        title={title || `YouTube video ${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        className="rounded-lg"
        loading="lazy"
        style={{
          display: isLoading ? "none" : "block",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default YouTubePlayer;
