import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [yogaClasses, setYogaClasses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInitialData();
    checkAuthStatus();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);

      // 백엔드 API에서 데이터 가져오기
      const [classesResponse, instructorsResponse] = await Promise.all([
        fetch("http://localhost:5001/api/yoga/classes"),
        fetch("http://localhost:5001/api/yoga/instructors"),
      ]);

      if (classesResponse.ok && instructorsResponse.ok) {
        const classesData = await classesResponse.json();
        const instructorsData = await instructorsResponse.json();

        setYogaClasses(classesData.classes || classesData);
        setInstructors(instructorsData);
      } else {
        // 백엔드가 안 되면 더미 데이터 사용
        loadDummyData();
      }
    } catch (error) {
      console.error("API 호출 실패, 더미 데이터 사용:", error);
      loadDummyData();
    } finally {
      setLoading(false);
    }
  };

  const loadDummyData = () => {
    setYogaClasses([
      {
        id: 1,
        title: "초보자를 위한 하타 요가",
        instructor: "김*련",
        duration: "60분",
        difficulty: "초급",
        price: 25000,
        image:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
      },
      {
        id: 2,
        title: "심신 안정 명상 요가",
        instructor: "박*온",
        duration: "45분",
        difficulty: "중급",
        price: 30000,
        image:
          "https://images.unsplash.com/photo-1506126613408-eca07ce68e71?w=400",
      },
      {
        id: 3,
        title: "파워 비니야사 플로우",
        instructor: "이*력",
        duration: "75분",
        difficulty: "고급",
        price: 35000,
        image:
          "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400",
      },
    ]);

    setInstructors([
      {
        id: 1,
        name: "김*련",
        specialty: "하타 요가, 초보자 지도",
        experience: "8년",
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1594824226453-5d8ecd5c0d49?w=300",
      },
      {
        id: 2,
        name: "박*온",
        specialty: "명상 요가, 스트레스 관리",
        experience: "12년",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300",
      },
      {
        id: 3,
        name: "이*력",
        specialty: "파워 요가, 체력 강화",
        experience: "10년",
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      },
    ]);
  };

  const checkAuthStatus = () => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
        setIsLoggedIn(true);
      } catch (error) {
        console.error("사용자 데이터 파싱 오류:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  };

  const login = async (credentials) => {
    console.log("AppContext login 호출:", credentials.email);

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      console.log("서버 응답 상태:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("로그인 성공 데이터:", data);

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setIsLoggedIn(true);
        setShowLogin(false);

        return { success: true };
      } else {
        const errorData = await response.json();
        console.log("로그인 실패:", errorData);
        return { success: false, message: errorData.message };
      }
    } catch (error) {
      console.error("로그인 요청 실패:", error);

      // 백엔드가 연결되지 않은 경우 더미 로그인 처리
      console.log("백엔드 연결 실패, 더미 로그인 처리");

      const dummyUser = {
        id: 1,
        name: "요가 애호가",
        email: credentials.email,
      };

      localStorage.setItem("user", JSON.stringify(dummyUser));
      localStorage.setItem("token", "dummy-token-" + Date.now());
      setUser(dummyUser);
      setIsLoggedIn(true);
      setShowLogin(false);

      return { success: true };
    }
  };

  const register = async (userData) => {
    try {
      console.log("회원가입 요청:", userData);

      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log("회원가입 응답 상태:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("회원가입 성공:", data);
        return { success: true, message: data.message };
      } else {
        const errorData = await response.json();
        console.log("회원가입 실패:", errorData);
        return {
          success: false,
          message: errorData.message || "회원가입에 실패했습니다.",
        };
      }
    } catch (error) {
      console.error("회원가입 요청 실패:", error);

      // 백엔드가 연결되지 않은 경우 더미 회원가입 처리
      if (error.message.includes("fetch")) {
        console.log("백엔드 연결 실패, 더미 회원가입 처리");
        return {
          success: true,
          message: "회원가입이 완료되었습니다. (오프라인 모드)",
        };
      }

      return { success: false, message: "회원가입 중 오류가 발생했습니다." };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    console.log("로그아웃 완료");
  };

  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    showLogin,
    setShowLogin,
    showRegister,
    setShowRegister,
    yogaClasses,
    setYogaClasses,
    instructors,
    setInstructors,
    loading,
    setLoading,
    login,
    register,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
