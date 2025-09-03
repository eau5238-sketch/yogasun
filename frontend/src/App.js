import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./components/contexts/AppContext";
import Header from "./components/common/Header";
import HomePage from "./pages/HomePage";
import ClassesPage from "./pages/ClassesPage";
import InstructorsPage from "./pages/InstructorsPage";
import InstructorDetailPage from "./pages/InstructorDetailPage";
import CommunityPage from "./pages/CommunityPage";
import DashboardPage from "./pages/DashboardPage";
import LoginModal from "./components/auth/LoginModal";
import RegisterModal from "./components/auth/RegisterModal";
import FAQ from "./components/contact/FAQ";
import MeditationPage from "./pages/MeditationPage";
import BuddyPage from "./pages/BuddyPage";
import ApiTestComponent from "./components/common/ApiTestComponent";
import "./App.css";

// 404 페이지 컴포넌트
const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="text-xl text-gray-600 mt-4">페이지를 찾을 수 없습니다</p>
      <a
        href="/"
        className="inline-block mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        홈으로 돌아가기
      </a>
    </div>
  </div>
);

// App 컴포넌트
function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <Routes>
              {/* 메인 페이지 */}
              <Route path="/" element={<HomePage />} />

              {/* 🧘‍♀️ 명상 및 웰니스 관련 페이지들 */}
              <Route path="/meditation" element={<MeditationPage />} />
              <Route path="/yoga-meditation" element={<MeditationPage />} />
              <Route path="/wellness" element={<MeditationPage />} />

              {/* 기타 페이지 */}
              <Route path="/faq" element={<FAQ />} />
              <Route path="/classes" element={<ClassesPage />} />
              <Route path="/instructors" element={<InstructorsPage />} />
              <Route
                path="/instructors/:id"
                element={<InstructorDetailPage />}
              />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/buddy" element={<BuddyPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/mypage" element={<DashboardPage />} />
              <Route path="/booking" element={<ClassesPage />} />
              {/* API 테스트 라우트 추가 👈 */}
              <Route path="/api-test" element={<ApiTestComponent />} />

              {/* 404 페이지 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* 모달은 라우터와 무관하게 전역적으로 렌더링될 수 있습니다. */}
          <LoginModal />
          <RegisterModal />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
