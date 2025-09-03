import React from "react";

const FooterNavSection = ({ setCurrentSection }) => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">더 알아보기</h2>
          <p className="text-lg text-gray-600">
            MindYoga에 대한 더 자세한 정보를 확인해보세요
          </p>
        </div>

      // 이용약관 렌더링 함수
  const renderTerms = () => (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">이용약관</h1>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          <p className="text-gray-700 leading-relaxed mb-8">
            이 약관은 MindYoga가(이하 '회사')가 제공하는 요가 콘텐츠 및
            서비스(이하 '서비스')의 이용 조건 및 절차에 관한 사항을 규정합니다.
          </p>

          {/* 목적 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">제1조 (목적)</h2>
            <p className="text-gray-700 leading-relaxed">
              본 약관은 서비스 이용자의 권리, 의무 및 책임 사항을 명확히 함을
              목적으로 합니다.
            </p>
          </section>

          {/* 이용자 의무 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">제2조 (이용자 의무)</h2>
            <p className="text-gray-700 leading-relaxed">
              이용자는 서비스 이용 시 관계 법령 및 본 약관을 준수해야 하며,
              회사의 업무를 방해하는 행위를 해서는 안 됩니다.
            </p>
          </section>

          {/* 서비스 제공 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">제3조 (서비스 제공)</h2>
            <p className="text-gray-700 leading-relaxed">
              회사는 챗봇 추천, 영상 시청, 수업 예약 등의 서비스를 제공하며,
              서비스 내용은 변경될 수 있습니다.
            </p>
          </section>

          {/* 개인정보보호 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">제4조 (개인정보보호)</h2>
            <p className="text-gray-700 leading-relaxed">
              회사는 관련 법령에 따라 이용자의 개인정보를 안전하게 보호합니다.
            </p>
          </section>

          {/* 책임 제한 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">제5조 (책임 제한)</h2>
            <p className="text-gray-700 leading-relaxed">
              회사는 천재지변 또는 불가항력으로 인해 서비스를 제공하지 못할 경우
              책임을 지지 않습니다.
            </p>
          </section>

          {/* 이용 제한 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">제6조 (이용 제한)</h2>
            <p className="text-gray-700 leading-relaxed">
              이용자가 약관을 위반할 경우, 회사는 서비스 이용을 제한하거나
              계약을 해지할 수 있습니다.
            </p>
          </section>

          {/* 분쟁 해결 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">제7조 (분쟁 해결)</h2>
            <p className="text-gray-700 leading-relaxed">
              서비스 이용과 관련하여 분쟁이 발생하면, 양 당사자는 원만한 해결을
              위해 노력해야 합니다.
            </p>
          </section>

          {/* 효력 발생 */}
          <section>
            <p className="text-gray-700 leading-relaxed">
              본 약관은 2025년 8월 23일부터 효력이 발생합니다.
            </p>
          </section>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => setCurrentSection("home")}
            className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );

  // 개인정보처리방침 렌더링 함수
  const renderPrivacyPolicy = () => (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">
          개인정보처리방침
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          <p className="text-gray-700 leading-relaxed mb-8">
            MindYoga는(이하 '회사') 이용자의 개인정보를 소중하게 생각하며,
            「개인정보보호법」 등 관련 법규를 준수하여 이용자의 권익 보호에
            최선을 다하고 있습니다.
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

          {/* 2. 수집하는 개인정보 항목 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              2. 수집하는 개인정보 항목
            </h2>
            <p className="text-gray-700 leading-relaxed">
              회사는 서비스 제공을 위해 최소한의 개인정보만을 수집하며, 이용자의
              동의 없이 추가 정보를 수집하지 않습니다.
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700 leading-relaxed">
              <li>필수 항목: 이름, 이메일 주소, 비밀번호</li>
              <li>선택 항목: 휴대전화번호, 프로필 사진</li>
            </ul>
          </section>

          {/* 3. 개인정보의 보유 및 이용 기간 */}
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

          {/* 4. 개인정보의 제3자 제공 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">
              4. 개인정보의 제3자 제공
            </h2>
            <p className="text-gray-700 leading-relaxed">
              회사는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만,
              이용자가 사전에 동의했거나 관련 법령에 의해 의무적으로 제공해야
              하는 경우는 예외로 합니다.
            </p>
          </section>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => setCurrentSection("home")}
            className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );

export default FooterNavSection;
