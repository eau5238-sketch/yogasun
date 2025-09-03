import React, { useState, useRef, useEffect, useContext } from "react";
import "./MeditationPlayer.css"; // CSS Modules 대신 일반 CSS 사용
import { useApp } from "../contexts/AppContext";

const MeditationPlayer = () => {
  const { user, isLoggedIn } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [selectedDuration, setSelectedDuration] = useState(5);
  const [meditationStarted, setMeditationStarted] = useState(false);
  const [showMeditationList, setShowMeditationList] = useState(false);

  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  // 음악 파일 URLs
  const musicFiles = {
    5: "https://cdn1.genspark.ai/user-upload-image/7/a171bb0c-b48a-4635-8427-a0c8fa56133e.mp3",
    10: "https://cdn1.genspark.ai/user-upload-image/7/97b1f5c0-3352-472c-aec4-fb388cc3803a.mp3",
  };

  const videoFile =
    "https://cdn1.genspark.ai/user-upload-image/5/cefab216-0e09-4d3f-9e09-ffbeace4157a.mp4";

  // 요가 명상 음악 목록 (에일린의 실제 영상으로 교체)
  const meditationMusicList = [
    {
      id: 1,
      title: "5분 호흡명상 - 뇌를 위한 최고의 휴식법",
      duration: "5분",
      description: "스트레스 해소, 뇌 피로 회복을 위한 5분 호흡명상",
      videoId: "Hv5dNa_JqFs", // 에일린의 실제 영상
      instructor: "에일린"
    },
    {
      id: 2,
      title: "5분 아침명상 - 오늘은 특별한 날입니다",
      duration: "5분",
      description: "하루를 특별하게 시작하는 5분 아침명상",
      videoId: "BjEq1AVRgzc", // 에일린의 실제 영상
      instructor: "에일린"
    },
    {
      id: 3,
      title: "5분 명상 - 인생을 180도 바꾸는 습관",
      duration: "5분",
      description: "호흡명상 가이드로 인생을 바꾸는 5분 명상",
      videoId: "umEJnBsHjqg", // 에일린의 실제 영상
      instructor: "에일린"
    },
    {
      id: 4,
      title: "아침에 눈 뜨자마자 하는 5분 명상",
      duration: "5분",
      description: "아침 확언, 누워서 하는 명상으로 하루를 시작",
      videoId: "EOJa7MqnVrs", // 에일린의 실제 영상
      instructor: "에일린"
    },
    {
      id: 5,
      title: "아침을 시작하는 5분 명상",
      duration: "5분",
      description: "아침 스트레칭과 함께 상쾌한 마음으로 '오늘'을 준비하세요!",
      videoId: "lFcSrYw-ARY",
      instructor: "명상*음악"
    }
  ];

  // 비디오 플레이어 상태 추가
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);

  // YouTube 영상 재생 함수 (임베드 방식으로 변경)
  const playMeditationVideo = (videoId) => {
    if (!isLoggedIn) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }
    setCurrentVideoId(videoId);
    setShowMeditationList(false);
    setShowVideoPlayer(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.src = musicFiles[selectedDuration];
    }
  }, [selectedDuration, volume]);

  useEffect(() => {
    if (isPlaying && meditationStarted) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= selectedDuration * 60) {
            handleStop();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isPlaying, meditationStarted, selectedDuration]);

  const handlePlay = async () => {
    if (!meditationStarted) {
      setMeditationStarted(true);
      setCurrentTime(0);
    }

    try {
      await audioRef.current?.play();
      await videoRef.current?.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("재생 실패:", error);
    }
  };

  const handlePause = () => {
    audioRef.current?.pause();
    videoRef.current?.pause();
    setIsPlaying(false);
  };

  const handleStop = () => {
    audioRef.current?.pause();
    videoRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
    if (videoRef.current) videoRef.current.currentTime = 0;
    setIsPlaying(false);
    setMeditationStarted(false);
    setCurrentTime(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const progressPercentage = (currentTime / (selectedDuration * 60)) * 100;

  return (
    <div className="meditation-container">
      <div className="meditation-video-container">
        <video
          ref={videoRef}
          className="meditation-background-video"
          muted
          loop
          playsInline
        >
          <source src={videoFile} type="video/mp4" />
        </video>

        <div className="meditation-overlay">
          <div className="meditation-card">
            <h1 className="meditation-title">🧘‍♀️ 요가 명상</h1>

            {!meditationStarted && (
              <div className="meditation-duration-selector">
                <h3>명상 시간을 선택하세요</h3>
                <div className="meditation-duration-buttons">
                  <button
                    className={`meditation-duration-btn ${
                      selectedDuration === 5 ? "active" : ""
                    }`}
                    onClick={() => setSelectedDuration(5)}
                  >
                    5분
                  </button>
                  <button
                    className={`meditation-duration-btn ${
                      selectedDuration === 10 ? "active" : ""
                    }`}
                    onClick={() => setSelectedDuration(10)}
                  >
                    10분
                  </button>
                </div>
              </div>
            )}

            <div className="meditation-timer">
              <div className="meditation-time-display">
                {formatTime(currentTime)} / {formatTime(selectedDuration * 60)}
              </div>
              <div className="meditation-progress-bar">
                <div
                  className="meditation-progress"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <div className="meditation-controls">
              {!isLoggedIn ? (
                <button className="meditation-login-btn" onClick={() => alert("로그인 후 이용 가능합니다.")}>
                  🔒 로그인을 신청하세요
                </button>
              ) : !isPlaying ? (
                <button className="meditation-play-btn" onClick={handlePlay}>
                  ▶️ 시작
                </button>
              ) : (
                <button className="meditation-pause-btn" onClick={handlePause}>
                  ⏸️ 일시정지
                </button>
              )}

              {isLoggedIn && (
                <button className="meditation-stop-btn" onClick={handleStop}>
                  ⏹️ 정지
                </button>
              )}
            </div>

            {isLoggedIn && (
              <div className="meditation-volume-control">
                <label>🔊 음량</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="meditation-volume-slider"
                />
              </div>
            )}

            {meditationStarted && isLoggedIn && (
              <div className="meditation-guide">
                <p>🌸 깊게 숨을 들이마시고 천천히 내쉬세요</p>
                <p>✨ 마음을 비우고 현재 순간에 집중하세요</p>
              </div>
            )}

            {/* 추가 명상 음악 목록 버튼 */}
            <div className="meditation-extra-section">
              <button 
                className="meditation-extra-btn"
                onClick={() => setShowMeditationList(!showMeditationList)}
              >
                🎵 추가 명상 음악 더보기 ({meditationMusicList.length}개)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 추가 명상 음악 목록 모달 */}
      {showMeditationList && (
        <div className="meditation-list-modal">
          <div className="meditation-list-content">
            <div className="meditation-list-header">
              <h2>🎵 요가 명상 음악 모음</h2>
              <button 
                className="meditation-list-close-btn"
                onClick={() => setShowMeditationList(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="meditation-list-grid">
              {meditationMusicList.map((music) => (
                <div key={music.id} className="meditation-music-card">
                  <div className="meditation-music-info">
                    <h3 className="meditation-music-title">{music.title}</h3>
                    <p className="meditation-music-instructor">👨‍🏫 {music.instructor}</p>
                    <p className="meditation-music-duration">⏱️ {music.duration}</p>
                    <p className="meditation-music-description">{music.description}</p>
                  </div>
                  {isLoggedIn ? (
                    <button 
                      className="meditation-music-play-btn"
                      onClick={() => playMeditationVideo(music.videoId)}
                    >
                      ▶️ 재생하기
                    </button>
                  ) : (
                    <button 
                      className="meditation-music-login-btn"
                      onClick={() => alert("로그인 후 이용 가능합니다.")}
                    >
                      🔒 로그인 필요
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showVideoPlayer && currentVideoId && (
        <div className="video-player-overlay">
          <div className="video-player-content">
            <h2>🎵 {meditationMusicList.find(music => music.videoId === currentVideoId)?.title}</h2>
            <div className="video-player-iframe-container">
              <iframe
                src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`}
                title="YouTube Video Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <button className="video-player-close-btn" onClick={() => setShowVideoPlayer(false)}>
              ✕
            </button>
          </div>
        </div>
      )}

      <audio ref={audioRef} loop preload="auto" />
    </div>
  );
};

export default MeditationPlayer;
