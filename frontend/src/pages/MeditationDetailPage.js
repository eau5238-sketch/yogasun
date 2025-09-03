import React, { useState, useEffect, useRef } from "react";
import {
  Headphones,
  Home,
  SkipBack,
  Pause,
  Play,
  SkipForward,
  VolumeX,
  Volume2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const MeditationPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [selectedDuration, setSelectedDuration] = useState(5);
  const [meditationStarted, setMeditationStarted] = useState(false);
  
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  // 음악 파일 URLs
  const musicFiles = {
    5: 'https://cdn1.genspark.ai/user-upload-image/7/a171bb0c-b48a-4635-8427-a0c8fa56133e.mp3',
    10: 'https://cdn1.genspark.ai/user-upload-image/7/97b1f5c0-3352-472c-aec4-fb388cc3803a.mp3'
  };

  const videoFile = 'https://cdn1.genspark.ai/user-upload-image/5/cefab216-0e09-4d3f-9e09-ffbeace4157a.mp4';

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.src = musicFiles[selectedDuration];
    }
  }, [selectedDuration, volume]);

  useEffect(() => {
    if (isPlaying && meditationStarted) {
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => {
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
      console.error('재생 실패:', error);
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
    audioRef.current.currentTime = 0;
    videoRef.current.currentTime = 0;
    setIsPlaying(false);
    setMeditationStarted(false);
    setCurrentTime(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / (selectedDuration * 60)) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.videoContainer}>
        <video
          ref={videoRef}
          className={styles.backgroundVideo}
          muted
          loop
          playsInline
        >
          <source src={videoFile} type="video/mp4" />
        </video>
        
        <div className={styles.overlay}>
          <div className={styles.meditationCard}>
            <h1 className={styles.title}>🧘‍♀️ 요가 명상</h1>
            
            {!meditationStarted && (
              <div className={styles.durationSelector}>
                <h3>명상 시간을 선택하세요</h3>
                <div className={styles.durationButtons}>
                  <button
                    className={`${styles.durationBtn} ${selectedDuration === 5 ? styles.active : ''}`}
                    onClick={() => setSelectedDuration(5)}
                  >
                    5분
                  </button>
                  <button
                    className={`${styles.durationBtn} ${selectedDuration === 10 ? styles.active : ''}`}
                    onClick={() => setSelectedDuration(10)}
                  >
                    10분
                  </button>
                </div>
              </div>
            )}

            <div className={styles.timer}>
              <div className={styles.timeDisplay}>
                {formatTime(currentTime)} / {formatTime(selectedDuration * 60)}
              </div>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progress} 
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <div className={styles.controls}>
              {!isPlaying ? (
                <button className={styles.playBtn} onClick={handlePlay}>
                  ▶️ 시작
                </button>
              ) : (
                <button className={styles.pauseBtn} onClick={handlePause}>
                  ⏸️ 일시정지
                </button>
              )}
              
              <button className={styles.stopBtn} onClick={handleStop}>
                ⏹️ 정지
              </button>
            </div>

            <div className={styles.volumeControl}>
              <label>🔊 음량</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className={styles.volumeSlider}
              />
            </div>

            {meditationStarted && (
              <div className={styles.meditationGuide}>
                <p>🌸 깊게 숨을 들이마시고 천천히 내쉬세요</p>
                <p>✨ 마음을 비우고 현재 순간에 집중하세요</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        loop
        preload="auto"
      />
    </div>
  );
};

export default MeditationDetailPage;