import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

// 데이터 저장/로드 헬퍼 함수들
const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("로컬 스토리지 저장 실패:", error);
  }
};

const loadFromLocalStorage = (key, defaultValue = []) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("로컬 스토리지 로드 실패:", error);
    return defaultValue;
  }
};

// 스타일 정의
const tailwindStyles = `
  .gradient-bg {
    background-image: linear-gradient(to right, #6d28d9, #9333ea);
  }
  .faq-accordion {
    transition: all 0.3s ease;
  }
  .faq-accordion.open {
    border-color: #9333ea;
  }
  .line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`;

// FAQ 페이지 컴포넌트
const FAQ = () => {
  // 상태 관리
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [openFaqId, setOpenFaqId] = useState(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiries, setInquiries] = useState([]);
  const [isAdminView, setIsAdminView] = useState(false);

  // FAQ 데이터
  const [faqs] = useState([
    {
      id: 1,
      category: "요가 기초",
      question: "요가를 처음 시작하는데 어떤 준비물이 필요한가요?",
      answer:
        "요가를 시작하기 위해서는 다음과 같은 기본 준비물이 필요합니다:\n\n1. 요가 매트 - 미끄럽지 않고 두께가 적당한 매트\n2. 편안한 운동복 - 신축성이 좋고 움직임에 제약이 없는 옷\n3. 물병 - 수분 보충용\n4. 요가 블록이나 스트랩 (선택사항) - 초보자에게 도움이 됩니다\n\n처음에는 기본적인 매트와 편안한 옷만 있어도 충분히 시작할 수 있습니다.",
      tags: ["준비물", "초보자", "매트", "운동복"],
    },
    {
      id: 2,
      category: "요가 기초",
      question: "요가 초보자도 따라할 수 있는 쉬운 동작이 있나요?",
      answer:
        "네, 초보자를 위한 기본 동작들을 추천드립니다:\n\n1. 산 자세 (Mountain Pose) - 바른 자세의 기초\n2. 고양이-소 자세 - 척추 유연성 향상\n3. 아래를 보는 개 자세 - 전신 스트레칭\n4. 아이 자세 - 휴식과 이완\n5. 다리 벽에 올리기 - 혈액순환 개선\n\n이 동작들은 부상 위험이 적고 요가의 기본기를 익히는 데 도움이 됩니다.",
      tags: ["초보자", "기본동작", "자세"],
    },
    {
      id: 3,
      category: "수업 및 예약",
      question: "요가 수업은 어떻게 예약하나요?",
      answer:
        "요가 수업 예약은 다음과 같은 방법으로 가능합니다:\n\n1. 온라인 예약 시스템 이용\n   - 웹사이트나 앱에서 24시간 예약 가능\n   - 실시간 잔여석 확인\n\n2. 전화 예약\n   - 운영시간 내 전화로 예약\n   - 상담을 통한 맞춤 수업 추천\n\n3. 현장 방문 예약\n   - 직접 센터 방문하여 예약\n   - 시설 견학 및 상담 가능\n\n예약 취소는 수업 시작 2시간 전까지 가능합니다.",
      tags: ["예약", "온라인", "전화", "현장"],
    },
    {
      id: 4,
      category: "수업 및 예약",
      question: "수업 취소나 변경은 어떻게 하나요?",
      answer:
        "수업 취소 및 변경 정책:\n\n• 취소 가능 시간: 수업 시작 2시간 전까지\n• 변경 가능 횟수: 월 3회까지 무료\n• 취소 방법:\n  - 온라인 예약 시스템에서 직접 취소\n  - 전화로 취소 요청\n  - 모바일 앱을 통한 취소\n\n• 당일 취소 시 수업료의 50% 차감\n• 무단 불참 시 수업료 전액 차감\n• 긴급상황(질병, 사고 등) 시 별도 상담",
      tags: ["취소", "변경", "정책"],
    },
    {
      id: 5,
      category: "건강 및 안전",
      question: "임산부도 요가를 할 수 있나요?",
      answer:
        "임산부를 위한 요가 가이드:\n\n• 임신 안정기(16주 이후) 부터 권장\n• 반드시 의사와 상담 후 시작\n• 전용 임산부 요가 클래스 수강 권장\n\n주의사항:\n- 과도한 복부 압박 동작 금지\n- 오랜 시간 누워있는 자세 피하기\n- 균형감각이 떨어질 수 있으니 벽이나 도구 활용\n- 몸의 변화에 따라 강도 조절\n\n임산부 전용 클래스에서는 안전한 동작들로만 구성된 프로그램을 제공합니다.",
      tags: ["임산부", "안전", "주의사항"],
    },
    {
      id: 6,
      category: "건강 및 안전",
      question: "요가 중 부상을 방지하려면 어떻게 해야 하나요?",
      answer:
        "요가 부상 방지 수칙:\n\n1. 충분한 워밍업\n   - 수업 전 5-10분 가벼운 스트레칭\n   - 관절 움직임 확인\n\n2. 자신의 한계 인정\n   - 무리한 동작 시도 금지\n   - 통증이 있으면 즉시 중단\n\n3. 올바른 자세 유지\n   - 강사의 지도를 정확히 따르기\n   - 거울을 활용한 자세 점검\n\n4. 점진적 발전\n   - 급하게 높은 난이도 도전 금지\n   - 꾸준한 연습으로 단계별 향상\n\n5. 적절한 장비 사용\n   - 품질 좋은 요가 매트 사용\n   - 필요시 보조 도구 활용",
      tags: ["부상방지", "안전", "워밍업", "자세"],
    },
    {
      id: 7,
      category: "회원 및 결제",
      question: "회원권 종류와 가격이 궁금합니다.",
      answer:
        "회원권 종류 및 혜택:\n\n1. 1개월 회원권: 150,000원\n   - 무제한 수업 참여\n   - 개인 라커 제공\n\n2. 3개월 회원권: 400,000원 (월 133,000원)\n   - 10% 할인 혜택\n   - 무료 개인 상담 1회\n\n3. 6개월 회원권: 720,000원 (월 120,000원)\n   - 20% 할인 혜택\n   - 무료 개인 상담 2회\n   - 요가 용품 10% 할인\n\n4. 1년 회원권: 1,200,000원 (월 100,000원)\n   - 30% 할인 혜택\n   - 무료 개인 상담 4회\n   - 요가 용품 20% 할인\n   - 친구 추천 시 추가 혜택\n\n※ 첫 수업은 무료 체험 가능",
      tags: ["회원권", "가격", "혜택"],
    },
    {
      id: 8,
      category: "회원 및 결제",
      question: "환불 정책이 어떻게 되나요?",
      answer:
        "환불 정책 안내:\n\n• 수업 시작 전 전액 환불 가능\n• 수업 진행률에 따른 부분 환불:\n  - 10% 미만 진행: 90% 환불\n  - 30% 미만 진행: 70% 환불\n  - 50% 미만 진행: 50% 환불\n  - 50% 이상 진행: 환불 불가\n\n• 환불 사유:\n  - 개인 사정으로 인한 수강 불가\n  - 이사, 전근 등\n  - 의사 소견서가 있는 건강상 이유\n\n• 환불 처리 기간: 신청일로부터 7영업일\n• 환불 수수료: 환불 금액의 5%\n• 현금 결제 시 현금 환불, 카드 결제 시 카드 취소",
      tags: ["환불", "정책", "규정"],
    },
  ]);

  // 문의하기 폼 상태
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    type: "일반문의",
    subject: "",
    content: "",
  });

  // 컴포넌트 마운트 시 문의 데이터 로드
  useEffect(() => {
    const savedInquiries = loadFromLocalStorage("yogaInquiries", []);
    setInquiries(savedInquiries);
  }, []);

  // FAQ 필터링 함수
  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "전체" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (faq.tags &&
        faq.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ));
    return matchesCategory && matchesSearch;
  });

  // FAQ 카테고리 목록
  const categories = ["전체", ...new Set(faqs.map((faq) => faq.category))];

  // FAQ 토글 함수
  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  // 문의하기 폼 입력 핸들러
  const handleInquiryInputChange = (e) => {
    const { name, value } = e.target;
    setInquiryForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 문의하기 제출 핸들러
  const handleInquirySubmit = (e) => {
    e.preventDefault();

    if (
      !inquiryForm.name.trim() ||
      !inquiryForm.email.trim() ||
      !inquiryForm.subject.trim() ||
      !inquiryForm.content.trim()
    ) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inquiryForm.email)) {
      alert("올바른 이메일 주소를 입력해주세요.");
      return;
    }

    const newInquiry = {
      id: Date.now() + Math.random(),
      ...inquiryForm,
      date: format(new Date(), "yyyy년 MM월 dd일 HH:mm", { locale: ko }),
      status: "접수",
      answer: null,
      answerDate: null,
    };

    const updatedInquiries = [newInquiry, ...inquiries];
    setInquiries(updatedInquiries);

    // 로컬 스토리지에 저장
    saveToLocalStorage("yogaInquiries", updatedInquiries);

    // 폼 초기화 및 모달 닫기
    setInquiryForm({
      name: "",
      email: "",
      type: "일반문의",
      subject: "",
      content: "",
    });
    setIsInquiryModalOpen(false);

    alert("문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.");
  };

  // 관리자 답변 추가 함수 (데모용)
  const addAdminAnswer = (inquiryId, answer) => {
    const updatedInquiries = inquiries.map((inquiry) =>
      inquiry.id === inquiryId
        ? {
            ...inquiry,
            answer,
            answerDate: format(new Date(), "yyyy년 MM월 dd일 HH:mm", {
              locale: ko,
            }),
            status: "답변완료",
          }
        : inquiry
    );

    setInquiries(updatedInquiries);
    saveToLocalStorage("yogaInquiries", updatedInquiries);
  };

  return (
    <>
      <style>{tailwindStyles}</style>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      />

      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              자주 묻는 질문
            </h1>
            <p className="text-xl text-gray-600">
              궁금한 것이 있으시면 먼저 FAQ를 확인해보세요
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* 사이드바 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">빠른 도움말</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setIsInquiryModalOpen(true)}
                    className="w-full px-4 py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    <i className="fas fa-question-circle mr-2"></i>
                    문의하기
                  </button>

                  <button
                    onClick={() => setIsAdminView(!isAdminView)}
                    className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                  >
                    <i className="fas fa-user-cog mr-2"></i>
                    {isAdminView ? "사용자 모드" : "관리자 모드"}
                  </button>
                </div>
              </div>

              {/* 카테고리 필터 */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4">카테고리</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? "bg-purple-100 text-purple-800 font-semibold"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 메인 컨텐츠 */}
            <div className="lg:col-span-3">
              {!isAdminView ? (
                <>
                  {/* 검색 바 */}
                  <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="FAQ 검색..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    </div>
                  </div>

                  {/* FAQ 목록 */}
                  <div className="space-y-4">
                    {filteredFaqs.map((faq) => (
                      <div
                        key={faq.id}
                        className={`faq-accordion bg-white rounded-2xl shadow-lg border-2 border-transparent ${
                          openFaqId === faq.id ? "open" : ""
                        }`}
                      >
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-t-2xl transition-colors"
                        >
                          <div className="flex-1">
                            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full mb-2">
                              {faq.category}
                            </span>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {faq.question}
                            </h3>
                          </div>
                          <i
                            className={`fas fa-chevron-down transform transition-transform ml-4 ${
                              openFaqId === faq.id ? "rotate-180" : ""
                            }`}
                          ></i>
                        </button>

                        {openFaqId === faq.id && (
                          <div className="px-6 pb-6 border-t border-gray-100">
                            <div className="pt-4 text-gray-700 leading-relaxed whitespace-pre-line">
                              {faq.answer}
                            </div>
                            {faq.tags && (
                              <div className="mt-4 flex flex-wrap gap-2">
                                {faq.tags.map((tag, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {filteredFaqs.length === 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                      <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
                      <h3 className="text-xl font-semibold text-gray-500 mb-2">
                        검색 결과가 없습니다
                      </h3>
                      <p className="text-gray-400">
                        다른 키워드로 검색하거나 문의하기를 이용해주세요.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                /* 관리자 문의 관리 화면 */
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      문의 관리
                    </h2>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                      총 {inquiries.length}건
                    </span>
                  </div>

                  <div className="space-y-4">
                    {inquiries.map((inquiry) => (
                      <div
                        key={inquiry.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-semibold text-gray-900">
                              {inquiry.subject}
                            </h4>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                inquiry.status === "답변완료"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {inquiry.status}
                            </span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                              {inquiry.type}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {inquiry.date}
                          </span>
                        </div>

                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-1">
                            <strong>문의자:</strong> {inquiry.name} (
                            {inquiry.email})
                          </p>
                          <p className="text-gray-700">{inquiry.content}</p>
                        </div>

                        {inquiry.answer && (
                          <div className="bg-blue-50 p-3 rounded-lg mb-3">
                            <p className="text-sm text-blue-600 mb-1">
                              <strong>관리자 답변</strong> ({inquiry.answerDate}
                              )
                            </p>
                            <p className="text-blue-800">{inquiry.answer}</p>
                          </div>
                        )}

                        {!inquiry.answer && (
                          <button
                            onClick={() => {
                              const answer = prompt("답변을 입력하세요:");
                              if (answer && answer.trim()) {
                                addAdminAnswer(inquiry.id, answer);
                              }
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            답변하기
                          </button>
                        )}
                      </div>
                    ))}

                    {inquiries.length === 0 && (
                      <div className="text-center py-12">
                        <i className="fas fa-inbox text-4xl text-gray-300 mb-4"></i>
                        <p className="text-gray-500">등록된 문의가 없습니다.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 문의하기 모달 */}
      {isInquiryModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsInquiryModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">문의하기</h3>
                <button
                  onClick={() => setIsInquiryModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>

            <form onSubmit={handleInquirySubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={inquiryForm.name}
                    onChange={handleInquiryInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="이름을 입력해주세요"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={inquiryForm.email}
                    onChange={handleInquiryInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="이메일을 입력해주세요"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  문의 유형
                </label>
                <select
                  name="type"
                  value={inquiryForm.type}
                  onChange={handleInquiryInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="일반문의">일반문의</option>
                  <option value="수업문의">수업문의</option>
                  <option value="결제문의">결제문의</option>
                  <option value="기술문의">기술문의</option>
                  <option value="기타">기타</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  제목 *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={inquiryForm.subject}
                  onChange={handleInquiryInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="문의 제목을 입력해주세요"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  문의 내용 *
                </label>
                <textarea
                  name="content"
                  value={inquiryForm.content}
                  onChange={handleInquiryInputChange}
                  rows="6"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="문의하실 내용을 자세히 작성해주세요."
                  required
                ></textarea>
              </div>

              <div className="flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsInquiryModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 gradient-bg text-white rounded-lg hover:shadow-lg transition-all"
                >
                  문의 접수
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FAQ;
