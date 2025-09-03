import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001/api";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 추가 (에러 처리를 위해)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API 요청 실패:", error);
    return Promise.reject(error);
  }
);

// yogaService를 named export로 export
export const yogaService = {
  // 기존 메서드들
  getClasses: () => api.get("/yoga/classes"),
  getClass: (id) => api.get(`/yoga/classes/${id}`),
  bookClass: (classId, bookingData) =>
    api.post(`/yoga/classes/${classId}/book`, bookingData),
  getInstructors: () => api.get("/yoga/instructors"),
  getInstructor: (id) => api.get(`/yoga/instructors/${id}`),
  getUserBookings: () => api.get("/yoga/bookings"),

  // 환경 정보 확인 메서드 추가
  getEnvironmentInfo: () => {
    return {
      API_URL: API_URL,
      NODE_ENV: process.env.NODE_ENV,
      REACT_APP_API_URL: process.env.REACT_APP_API_URL,
      hasToken: !!localStorage.getItem("token"),
      timestamp: new Date().toISOString(),
    };
  },
  // 무료체험 요가 수업 가져오기
  getFreeTrialClasses: async () => {
    try {
      const response = await api.get("/yoga/free-trial");
      return response.data;
    } catch (error) {
      console.error("무료체험 수업 데이터 로딩 실패:", error);
      throw error;
    }
  },

  // 특정 비디오 정보 가져오기
  getVideoById: async (id) => {
    try {
      const response = await api.get(`/yoga/video/${id}`);
      return response.data;
    } catch (error) {
      console.error("비디오 정보 로딩 실패:", error);
      throw error;
    }
  },

  // 레벨 정보 가져오기
  getLevels: async () => {
    try {
      const response = await api.get("/yoga/levels");
      return response.data;
    } catch (error) {
      console.error("레벨 정보 로딩 실패:", error);
      throw error;
    }
  },

  // 비디오 시청 기록 저장
  recordVideoView: async (videoId, viewData) => {
    try {
      const response = await api.post(`/yoga/video/${videoId}/view`, viewData);
      return response.data;
    } catch (error) {
      console.error("시청 기록 저장 실패:", error);
      throw error;
    }
  },

  // 커뮤니티 게시글 가져오기 (기존 서버에 있던 API)
  getCommunityPosts: async () => {
    try {
      const response = await api.get("/community/posts");
      return response.data;
    } catch (error) {
      console.error("커뮤니티 게시글 로딩 실패:", error);
      throw error;
    }
  },

  // 사용자 프로필 가져오기 (인증 필요)
  getUserProfile: async () => {
    try {
      const response = await api.get("/user/profile");
      return response.data;
    } catch (error) {
      console.error("사용자 프로필 로딩 실패:", error);
      throw error;
    }
  },
};

// 인증 관련 서비스
export const authService = {
  login: async (loginData) => {
    try {
      const response = await api.post("/auth/login", loginData);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error("로그인 실패:", error);
      throw error;
    }
  },

  register: async (registerData) => {
    try {
      const response = await api.post("/auth/register", registerData);
      return response.data;
    } catch (error) {
      console.error("회원가입 실패:", error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};
