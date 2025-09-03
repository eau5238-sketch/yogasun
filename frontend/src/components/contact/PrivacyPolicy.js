import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-12">개인정보처리방침</h1>

      <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
        <div className="text-right text-sm text-gray-500 mb-8">
          최종 수정일: 2025년 8월 20일
        </div>

        <p className="text-gray-700 leading-relaxed mb-8">
          MindYoga는(이하 '회사') 이용자의 개인정보를 소중하게 생각하며,
          「개인정보보호법」 등 관련 법규를 준수하여 이용자의 권익 보호에 최선을
          다하고 있습니다.
        </p>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-purple-600">
            1. 개인정보 수집 및 이용 목적
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed ml-4">
            <li>서비스 제공 및 계약 이행</li>
            <li>회원 관리 및 본인 확인</li>
            <li>고객 상담 및 불만 처리</li>
            <li>서비스 개선 및 개발</li>
            <li>마케팅 및 광고 활용 (선택사항)</li>
            <li>법적 의무 이행 및 분쟁 해결</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-purple-600">
            2. 수집하는 개인정보 항목
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            회사는 서비스 제공을 위해 최소한의 개인정보만을 수집하며, 이용자의
            동의 없이 추가 정보를 수집하지 않습니다.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-bold text-gray-800 mb-2">【필수정보】</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
              <li>이름, 이메일 주소, 전화번호</li>
              <li>비밀번호, 생년월일, 성별</li>
              <li>서비스 이용 기록, 접속 로그, 쿠키</li>
              <li>결제 정보 (카드번호, 계좌정보 등)</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-2">【선택정보】</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
              <li>프로필 사진, 주소</li>
              <li>건강 상태 정보 (운동 경험, 신체 조건 등)</li>
              <li>요가 수준, 선호 수업 유형</li>
              <li>마케팅 수신 동의 여부</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-purple-600">
            3. 개인정보의 보유 및 이용 기간
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용 목적이
            달성되면 지체 없이 파기합니다. 단, 관계 법령에 따라 일정 기간
            보존해야 할 필요가 있는 경우에는 해당 기간 동안 보관합니다.
          </p>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-2">
              【전자상거래 등에서의 소비자보호에 관한 법률】
            </h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
              <li>계약 또는 청약철회 등에 관한 기록 : 5년</li>
              <li>대금결제 및 재화 등의 공급에 관한 기록 : 5년</li>
              <li>소비자의 불만 또는 분쟁처리에 관한 기록 : 3년</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-purple-600">
            4. 개인정보의 제3자 제공
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
            다만, 아래의 경우에는 예외로 합니다:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed ml-4">
            <li>이용자들이 사전에 동의한 경우</li>
            <li>
              법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와
              방법에 따라 수사기관의 요구가 있는 경우
            </li>
            <li>서비스 제공을 위한 필수적 업무위탁의 경우</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-purple-600">
            5. 개인정보보호책임자
          </h2>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-2">
                  【개인정보보호책임자】
                </h4>
                <p className="text-gray-700">성명: 홍길동</p>
                <p className="text-gray-700">직책: 개인정보보호책임자</p>
                <p className="text-gray-700">연락처: privacy@mindyoga.com</p>
                <p className="text-gray-700">전화: 02-1234-5678</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">
                  【개인정보보호담당부서】
                </h4>
                <p className="text-gray-700">부서명: 개인정보보호팀</p>
                <p className="text-gray-700">담당자: 김개인</p>
                <p className="text-gray-700">연락처: privacy@mindyoga.com</p>
                <p className="text-gray-700">전화: 02-1234-5679</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-purple-600">
            6. 개인정보 처리방침 변경
          </h2>
          <p className="text-gray-700 leading-relaxed">
            이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른
            변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일
            전부터 공지사항을 통하여 고지할 것입니다.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <p className="text-gray-700">
              <strong>공고일자:</strong> 2025년 8월 20일
            </p>
            <p className="text-gray-700">
              <strong>시행일자:</strong> 2025년 8월 27일
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
