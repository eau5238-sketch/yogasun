import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-12">개인정보처리방침</h1>
      <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
        <p className="text-gray-700 leading-relaxed mb-8">
          MindYoga는(이하 '회사') 이용자의 개인정보를 소중하게 생각하며,
          「개인정보보호법」 등 관련 법규를 준수하여 이용자의 권익 보호에 최선을
          다하고 있습니다.
        </p>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            1. 개인정보 수집 및 이용 목적
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
            <li>서비스 제공 및 계약 이행</li>
            <li>회원 관리 및 본인 확인</li>
            <li>고객 상담 및 불만 처리</li>
            <li>서비스 개선 및 개발</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. 수집하는 개인정보 항목</h2>
          <p className="text-gray-700 leading-relaxed">
            회사는 서비스 제공을 위해 최소한의 개인정보만을 수집하며, 이용자의
            동의 없이 추가 정보를 수집하지 않습니다.
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700 leading-relaxed">
            <li>필수 항목: 이름, 이메일 주소, 비밀번호</li>
            <li>선택 항목: 휴대전화번호, 프로필 사진</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            3. 개인정보의 보유 및 이용 기간
          </h2>
          <p className="text-gray-700 leading-relaxed">
            이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용 목적이
            달성되면 지체 없이 파기합니다. 단, 관계 법령에 따라 일정 기간
            보존해야 할 필요가 있는 경우에는 해당 기간 동안 보관합니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. 개인정보의 제3자 제공</h2>
          <p className="text-gray-700 leading-relaxed">
            회사는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만,
            이용자가 사전에 동의했거나 관련 법령에 의해 의무적으로 제공해야 하는
            경우는 예외로 합니다.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;