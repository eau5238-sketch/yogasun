import React from "react";

const TrialSection = ({ setShowLogin }) => {
  return (
    <section id="trial" className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">무료체험</h2>
          <p className="text-xl text-gray-600">
            에*린 강사의 "꼭 필요한 6가지 요가 동작"을 무료로 체험해보세요
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="video-responsive">
            <iframe
              width="100%"
              height="450"
              src="https://www.youtube.com/embed/Hv5dNa_JqFs?rel=0&modestbranding=1"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="꼭 필요한 6가지 요가 동작"
              className="rounded-t-lg"
            ></iframe>
          </div>

          <div className="p-6">
            <h3 className="text-2xl font-bold mb-2">
              꼭 필요한 6가지 요가 동작
            </h3>
            <p className="text-gray-600 mb-4">
              효과만점 기본 스트레칭, 기초요가 배우기
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <i className="fas fa-user mr-2"></i>
              <span className="mr-4">에일린 mind yoga</span>
              <i className="fas fa-clock mr-2"></i>
              <span className="mr-4">15:53</span>
              <i className="fas fa-eye mr-2"></i>
              <span>607,914 views</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setShowLogin(true)}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all hover:scale-105 shadow-lg"
          >
            더 많은 요가 영상 보기 (로그인 필요)
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrialSection;
