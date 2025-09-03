import React, { useState } from "react";
import { useApp } from "../contexts/AppContext";

const RegisterModal = () => {
  const { showRegister, setShowRegister, setShowLogin, register } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!showRegister) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      setLoading(false);
      return;
    }

    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        setSuccess(result.message);
        setTimeout(() => {
          setShowRegister(false);
          setShowLogin(true);
        }, 1500);
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      setError("회원가입 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">회원가입</h2>
          <p className="text-gray-600">YogaSpace와 함께 시작하세요</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="이름"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              placeholder="이메일"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "회원가입 중..." : "회원가입"}
          </button>
        </form>

        <div className="text-center mt-6">
          <span className="text-gray-600">이미 계정이 있으시나요? </span>
          <button
            onClick={() => {
              setShowRegister(false);
              setShowLogin(true);
            }}
            className="text-green-500 hover:text-green-700 font-semibold"
            disabled={loading}
          >
            로그인
          </button>
        </div>

        <button
          onClick={() => setShowRegister(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          disabled={loading}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default RegisterModal;
