import React, { useState } from "react";

const SupportSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const supportItems = [
    {
      type: "faq",
      title: "자주 묻는 질문",
      description: "FAQ 및 도움말",
      icon: "fas fa-question-circle",
      iconColor: "text-purple-600",
    },
    {
      type: "contact",
      title: "1:1 문의",
      description: "실시간 상담 서비스",
      icon: "fas fa-headset",
      iconColor: "text-blue-600",
    },
    {
      type: "guide",
      title: "이용가이드",
      description: "플랫폼 사용 방법",
      icon: "fas fa-book",
      iconColor: "text-green-600",
    },
    {
      type: "community",
      title: "커뮤니티",
      description: "요가 커뮤니티",
      icon: "fas fa-users",
      iconColor: "text-orange-600",
    },
  ];

  const handleSupportClick = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <>
      <section id="support" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">고객지원</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportItems.map((item) => (
              <div
                key={item.type}
                onClick={() => handleSupportClick(item.type)}
                className="bg-white rounded-lg shadow-lg p-6 text-center cursor-pointer hover:shadow-xl transition"
              >
                <i
                  className={`${item.icon} text-3xl ${item.iconColor} mb-4`}
                ></i>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 지원 모달 */}
      {showModal && (
        <SupportModal type={modalType} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default SupportSection;
