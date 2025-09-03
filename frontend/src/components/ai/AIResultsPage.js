import React from "react";

const AIResultsPage = ({ results }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎯 당신을 위한 맞춤 프로그램
          </h1>
          <p className="text-xl text-gray-600">
            AI가 분석한 결과를 바탕으로 선별된 프로그램들입니다
          </p>
        </div>

        {/* 결과 표시 로직 */}
        {/* ... */}
      </div>
    </div>
  );
};

export default AIResultsPage;
