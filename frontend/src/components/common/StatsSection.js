import React from "react";

const StatsSection = () => {
  const stats = [
    { icon: "👥", number: "50,000+", label: "회원 수" },
    { icon: "🎥", number: "1,000+", label: "요가 영상" },
    { icon: "⭐", number: "4.9", label: "평균 평점" },
    { icon: "🏆", number: "98%", label: "만족도" },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            MindYoga와 함께한 성과
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold mb-1">{stat.number}</div>
              <div className="text-lg opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
