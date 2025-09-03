import React, { useState } from "react";
import { yogaService, authService } from "../../services/yogaService";

const ApiTestComponent = () => {
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(false);

  const testEndpoint = async (name, apiCall) => {
    setLoading(true);
    try {
      const startTime = Date.now();
      const result = await apiCall();
      const endTime = Date.now();

      setTestResults((prev) => ({
        ...prev,
        [name]: {
          status: "success",
          data: result,
          responseTime: endTime - startTime,
          timestamp: new Date().toLocaleTimeString(),
        },
      }));
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        [name]: {
          status: "error",
          error: {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
          },
          timestamp: new Date().toLocaleTimeString(),
        },
      }));
    } finally {
      setLoading(false);
    }
  };

  const testAllEndpoints = async () => {
    setTestResults({});

    // 순차적으로 각 엔드포인트 테스트
    await testEndpoint("getFreeTrialClasses", yogaService.getFreeTrialClasses);
    await testEndpoint("getClasses", yogaService.getClasses);
    await testEndpoint("getInstructors", yogaService.getInstructors);
    await testEndpoint("getLevels", yogaService.getLevels);
  };

  const testConnection = async () => {
    const envInfo = yogaService.getEnvironmentInfo();
    console.log("🔧 환경 정보:", envInfo);

    // 간단한 연결 테스트
    await testEndpoint("환경정보", () => Promise.resolve(envInfo));
  };

  const renderTestResult = (name, result) => {
    const isSuccess = result.status === "success";

    return (
      <div
        key={name}
        className={`border rounded p-4 mb-4 ${
          isSuccess
            ? "border-green-300 bg-green-50"
            : "border-red-300 bg-red-50"
        }`}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold">{name}</h3>
          <span
            className={`px-2 py-1 rounded text-sm ${
              isSuccess
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {result.status.toUpperCase()}
          </span>
        </div>

        <div className="text-sm text-gray-600 mb-2">
          시간: {result.timestamp}
          {result.responseTime && ` | 응답시간: ${result.responseTime}ms`}
        </div>

        {isSuccess ? (
          <div>
            <strong>응답:</strong>
            <pre className="bg-gray-100 p-2 rounded mt-1 text-xs overflow-auto max-h-40">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </div>
        ) : (
          <div>
            <strong>에러:</strong>
            <pre className="bg-gray-100 p-2 rounded mt-1 text-xs overflow-auto max-h-40">
              {JSON.stringify(result.error, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🔍 API 연결 테스트</h1>

      <div className="mb-6 space-x-4">
        <button
          onClick={testConnection}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "테스트 중..." : "🔧 환경 정보 확인"}
        </button>

        <button
          onClick={testAllEndpoints}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? "테스트 중..." : "🚀 모든 API 테스트"}
        </button>

        <button
          onClick={() => setTestResults({})}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          🗑️ 결과 지우기
        </button>
      </div>

      <div className="space-y-4">
        {Object.entries(testResults).map(([name, result]) =>
          renderTestResult(name, result)
        )}
      </div>

      {Object.keys(testResults).length === 0 && !loading && (
        <div className="text-center text-gray-500 py-8">
          🎯 테스트 버튼을 클릭하여 API 연결 상태를 확인하세요.
        </div>
      )}
    </div>
  );
};

export default ApiTestComponent;
