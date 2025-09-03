import React, { useState } from "react";
import { useApp } from "../contexts/AppContext";

const LoginModal = () => {
  const { showLogin, setShowLogin, setShowRegister, login } = useApp();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!showLogin) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("로그인 시도:", formData.email); // 디버깅용

    try {
      const result = await login(formData);
      console.log("로그인 결과:", result); // 디버깅용

      if (result.success) {
        console.log("로그인 성공!");
        // 모달이 자동으로 닫히고 상태가 업데이트됨
      } else {
        setError(result.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      setError("로그인 중 오류가 발생했습니다.");
    }

    setLoading(false);
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} 로그인 시도`);
    // 소셜 로그인은 일단 더미로 처리
    const dummyUser = {
      id: Date.now(),
      name: `${provider} 사용자`,
      email: `user@${provider}.com`,
    };

    localStorage.setItem("user", JSON.stringify(dummyUser));
    localStorage.setItem("token", `${provider}-token-${Date.now()}`);

    // 컨텍스트 상태 업데이트
    login({ email: dummyUser.email, password: "dummy" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 relative">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">로그인</h2>
          <p className="text-gray-600">YogaSpace에 오신 것을 환영합니다</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              이메일
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="이메일을 입력하세요"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              비밀번호
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="비밀번호를 입력하세요"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className="text-center mb-4">
          <span className="text-gray-500">또는</span>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => handleSocialLogin("kakao")}
            className="w-full bg-yellow-400 text-black py-2 rounded-lg hover:bg-yellow-500 transition-colors"
            disabled={loading}
          >
            🗨️ 카카오로 로그인
          </button>
          <button
            onClick={() => handleSocialLogin("google")}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
            disabled={loading}
          >
            📧 구글로 로그인
          </button>
          <button
            onClick={() => handleSocialLogin("naver")}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
            disabled={loading}
          >
            🔍 네이버로 로그인
          </button>
        </div>

        <div className="text-center mt-6">
          <span className="text-gray-600">계정이 없으시나요? </span>
          <button
            onClick={() => {
              setShowLogin(false);
              setShowRegister(true);
            }}
            className="text-green-500 hover:text-green-700 font-semibold"
            disabled={loading}
          >
            회원가입
          </button>
        </div>

        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          disabled={loading}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
