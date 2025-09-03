// MindYoga/frontend/src/contexts/AuthContext.js
import React, { useState, useEffect, createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithCustomToken,
  signInAnonymously,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Firebase 설정 (환경 변수 또는 여기에 직접 입력)
const firebaseConfig = JSON.parse(
  typeof __firebase_config !== "undefined" ? __firebase_config : "{}"
);
const appId = typeof __app_id !== "undefined" ? __app_id : "default-app-id";

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 사용자 로그인 상태를 관리하기 위한 Context 생성
const AuthContext = createContext(null);

// AuthProvider 컴포넌트: 앱의 모든 자식 컴포넌트에 로그인 상태를 제공
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Canvas 환경에서 제공되는 커스텀 토큰으로 로그인하는 로직
  useEffect(() => {
    const signInWithCanvasToken = async () => {
      try {
        if (
          typeof __initial_auth_token !== "undefined" &&
          __initial_auth_token
        ) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error("Authentication error:", error);
      }
    };
    signInWithCanvasToken();
  }, []);

  // Firebase 인증 상태 변화를 감지하는 리스너 설정
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        const userRef = doc(db, "artifacts", appId, "users", currentUser.uid);
        await setDoc(
          userRef,
          {
            uid: currentUser.uid,
            lastLogin: new Date().toISOString(),
          },
          { merge: true }
        );
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 로그인 상태에 접근하기 위한 커스텀 훅
export const useAuth = () => {
  return useContext(AuthContext);
};
