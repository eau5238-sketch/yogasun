import React from "react";

const FeaturesSection = () => {
  const features = [
    {
      icon: "🤖",
      title: "AI 맞춤 추천",
      description: "개인 수준과 목표에 맞는 최적의 요가 추천",
    },
    {
      icon: "📹",
      title: "고품질 영상",
      description: "전문 강사의 실제 YouTube 고화질 영상",
    },
    {
      icon: "⏰",
      title: "실시간 수업 예약",
      description: "언제 어디서나 원하는 시간에 요가 수업을 예약",
    },
    {
      icon: "💪",
      title: "건강 관리 시스템",
      description: "체계적인 건강 데이터 관리로 효과 확인",
    },
    {
      icon: "🏆",
      title: "챌린지 시스템",
      description: "재미있는 챌린지로 꾸준한 동기부여",
    },
    {
      icon: "👩‍🏫",
      title: "전문 강사진",
      description: "경험 풍부한 한국 요가 전문가들의 지도",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            왜 MindYoga인가요?
          </h2>
          <p className="text-xl text-gray-600">
            개인 맞춤형 요가 경험을 제공하는 이유
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-105 card"
            >
              <div className="text-5xl mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
