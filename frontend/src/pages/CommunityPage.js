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

// Tailwind CSS를 위한 gradient-bg 스타일 정의
const tailwindStyles = `
  .gradient-bg {
    background-image: linear-gradient(to right, #6d28d9, #9333ea);
  }
  .line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`;

// 요가 버디 찾기 컴포넌트
const BuddyList = ({ posts }) => {
  const buddyPosts = posts.filter((post) => post.category === "요가버디");

  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-xl font-bold">근처 요가 버디</h3>
      {buddyPosts.length > 0 ? (
        buddyPosts.map((post) => (
          <div
            key={post.id}
            className="p-4 bg-gray-50 rounded-lg flex items-center space-x-4"
          >
            <img
              src={post.authorAvatar}
              alt={`버디${post.id}`}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold">
                {post.authorName} {post.location && `(${post.location})`}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-2">
                {post.content}
              </p>
              <p className="text-xs text-gray-400 mt-1">{post.date}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-500">
          아직 등록된 요가 버디가 없습니다.
        </div>
      )}
    </div>
  );
};

// 요가 버디 글쓰기 컴포넌트
const BuddyCreateForm = ({ onCreated }) => {
  const [formData, setFormData] = useState({
    content: "",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.content.trim() || !formData.location.trim()) {
      alert("내용과 지역을 모두 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const newBuddyPost = {
        id: Date.now() + Math.random(),
        title: `${formData.location} 요가 버디 모집`,
        authorName: "새로운 유저",
        authorAvatar: `https://placehold.co/48x48/6d28d9/ffffff?text=${formData.location.charAt(
          0
        )}`,
        date: format(new Date(), "yyyy년 MM월 dd일 HH:mm", { locale: ko }),
        content: formData.content,
        location: formData.location,
        likes: 0,
        comments: [],
        category: "요가버디",
      };

      // 기존 게시글 목록 가져오기
      const existingPosts = loadFromLocalStorage("yogaCommunityPosts", []);
      const updatedPosts = [newBuddyPost, ...existingPosts];

      // 로컬 스토리지에 저장
      saveToLocalStorage("yogaCommunityPosts", updatedPosts);

      // 폼 초기화
      setFormData({ content: "", location: "" });

      // 성공 메시지
      alert("요가 버디 글이 성공적으로 등록되었습니다!");

      // 부모 컴포넌트에 알림
      onCreated(updatedPosts);
    } catch (error) {
      console.error("요가 버디 글 저장 실패:", error);
      alert("글 저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4">요가 버디 글쓰기</h3>

      <div className="mb-4">
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          지역
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="예: 서울 강남구, 부산 해운대구"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          내용
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          placeholder="요가 버디를 찾아보세요! 언제, 어디서, 어떤 요가를 함께 하고 싶은지 알려주세요."
          rows="4"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full px-4 py-2 gradient-bg text-white rounded-lg font-semibold transition-all ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"
        }`}
      >
        {isSubmitting ? "등록 중..." : "글 작성"}
      </button>
    </form>
  );
};

// 요가 커뮤니티 페이지 컴포넌트
const CommunityPage = () => {
  // 상태 관리
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailPost, setDetailPost] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [showBuddyPage, setShowBuddyPage] = useState(false);
  const [posts, setPosts] = useState([]);

  // 컴포넌트 마운트 시 로컬 스토리지에서 데이터 로드
  useEffect(() => {
    const savedPosts = loadFromLocalStorage("yogaCommunityPosts", [
      {
        id: 1,
        title: "첫 요가 한 달 후기 - 놀라운 변화!",
        authorName: "요가러버",
        authorAvatar:
          "https://images.stockcake.com/public/7/9/0/790e87af-a0d7-448a-9c53-a2aa81ca1097_large/forest-yoga-peace-stockcake.jpg",
        date: "2시간 전",
        content:
          "요가를 시작한 지 한 달이 되었는데, 정말 많은 변화를 느끼고 있어요. 특히 스트레스가 많이 줄어들고 숙면을 취할 수 있게 되었습니다. 자세 교정에도 도움이 되는 것 같아요!",
        likes: 24,
        comments: [
          {
            id: 1,
            authorName: "댓글러1",
            content: "정말 멋진 변화네요! 저도 시작해야겠어요.",
            date: "1시간 전",
          },
          {
            id: 2,
            authorName: "댓글러2",
            content: "축하드려요! 어떤 루틴으로 하셨는지 궁금해요.",
            date: "40분 전",
          },
        ],
        category: "후기",
      },
      {
        id: 2,
        title: "아침 요가 루틴 추천해주세요!",
        authorName: "명상마스터",
        authorAvatar:
          "https://images.stockcake.com/public/7/e/c/7eccaeb1-9d8d-4b1f-a08e-0d9cea534390_large/sunset-yoga-meditation-stockcake.jpg",
        date: "5시간 전",
        content:
          "바쁜 직장인인데 아침에 10-15분 정도로 할 수 있는 요가 루틴이 있을까요? 에너지를 충전할 수 있는 동작들로 구성된 루틴을 찾고 있습니다. 댓글로 추천해주시면 감사하겠습니다!",
        likes: 15,
        comments: [
          {
            id: 3,
            authorName: "댓글러3",
            content: "저는 태양 경배 자세 추천합니다! 아침에 하기 좋아요.",
            date: "3시간 전",
          },
        ],
        category: "질문",
      },
      {
        id: 3,
        title: "30일 챌린지 함께 하실 분들 모집합니다!",
        authorName: "요가초보",
        authorAvatar:
          "https://images.stockcake.com/public/c/a/5/ca512402-24f9-4f02-b773-7a29d10746d4_large/sunset-yoga-practice-stockcake.jpg",
        date: "1일 전",
        content:
          "매일 20분씩 요가하는 30일 챌린지를 시작하려고 합니다. 서로 격려하면서 함께 성장해요! 관심 있으신 분들 댓글 남겨주세요.",
        likes: 42,
        comments: [],
        category: "챌린지",
      },
    ]);
    setPosts(savedPosts);
  }, []);

  // 게시글 작성 제출
  const handlePostSubmit = (e) => {
    e.preventDefault();
    const title = e.target["post-title"].value;
    const category = e.target["post-category"].value;
    const content = e.target["post-content"].value;

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const newPostData = {
      id: Date.now() + Math.random(),
      title,
      authorName: "새로운 유저",
      authorAvatar: `https://placehold.co/48x48/6d28d9/ffffff?text=${title.charAt(
        0
      )}`,
      date: format(new Date(), "yyyy년 MM월 dd일 HH:mm", { locale: ko }),
      content,
      likes: 0,
      comments: [],
      category: category,
    };

    const updatedPosts = [newPostData, ...posts];
    setPosts(updatedPosts);

    // 로컬 스토리지에 저장
    saveToLocalStorage("yogaCommunityPosts", updatedPosts);

    // 성공 메시지 및 모달 닫기
    alert("게시글이 성공적으로 등록되었습니다!");
    hidePostModal();
  };

  // 댓글 제출
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim() === "" || !detailPost) return;

    const newComment = {
      id: Date.now() + Math.random(),
      authorName: "새 댓글러",
      content: commentInput,
      date: format(new Date(), "HH:mm", { locale: ko }),
    };

    const updatedPost = {
      ...detailPost,
      comments: [...(detailPost.comments || []), newComment],
    };

    const updatedPosts = posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );

    setPosts(updatedPosts);
    setDetailPost(updatedPost);
    setCommentInput("");

    // 로컬 스토리지에 저장
    saveToLocalStorage("yogaCommunityPosts", updatedPosts);
  };

  // 댓글 삭제
  const handleCommentDelete = (commentId) => {
    if (!detailPost) return;

    const updatedPost = {
      ...detailPost,
      comments: detailPost.comments.filter((c) => c.id !== commentId),
    };

    const updatedPosts = posts.map((p) =>
      p.id === updatedPost.id ? updatedPost : p
    );

    setPosts(updatedPosts);
    setDetailPost(updatedPost);

    // 로컬 스토리지에 저장
    saveToLocalStorage("yogaCommunityPosts", updatedPosts);
  };

  // 게시글 삭제
  const handlePostDelete = (postId) => {
    const updatedPosts = posts.filter((p) => p.id !== postId);
    setPosts(updatedPosts);
    setDetailPost(null);
    setIsDetailModalOpen(false);

    // 로컬 스토리지에 저장
    saveToLocalStorage("yogaCommunityPosts", updatedPosts);

    alert("게시글이 삭제되었습니다.");
  };

  // 버디 글 생성 완료 핸들러
  const handleBuddyCreated = (updatedPosts) => {
    setPosts(updatedPosts);
  };

  // 모달 제어 함수들
  const showPostModal = () => setIsPostModalOpen(true);
  const hidePostModal = () => setIsPostModalOpen(false);
  const showPostDetail = (post) => {
    setDetailPost(post);
    setIsDetailModalOpen(true);
  };
  const hidePostDetail = () => {
    setIsDetailModalOpen(false);
    setDetailPost(null);
  };
  const openBuddyPage = () => setShowBuddyPage(true);
  const closeBuddyPage = () => setShowBuddyPage(false);

  return (
    <>
      <style>{tailwindStyles}</style>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      />
      <div
        id="community"
        className="page pt-20 bg-gray-50 min-h-screen font-sans text-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 상단 제목 + 버튼 */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                커뮤니티
              </h1>
              <p className="text-xl text-gray-600">
                함께 성장하는 요가 커뮤니티에 참여하세요
              </p>
            </div>
            <button
              onClick={showPostModal}
              className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors shadow-md transform hover:scale-105"
            >
              새 글 작성
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* === 게시글 목록 === */}
            <div className="lg:col-span-2">
              <div id="posts-container" className="space-y-6">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="post-card bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow transform hover:-translate-y-1"
                    onClick={() => showPostDetail(post)}
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src={post.authorAvatar}
                        alt="사용자"
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {post.authorName}
                          {post.location && (
                            <span className="text-sm text-gray-500 ml-2">
                              ({post.location})
                            </span>
                          )}
                        </h4>
                        <p className="text-sm text-gray-500">{post.date}</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors">
                          <i className="far fa-heart mr-1"></i> {post.likes}
                        </button>
                        <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors">
                          <i className="far fa-comment mr-1"></i>{" "}
                          {post.comments.length}
                        </button>
                      </div>
                      <span
                        className={`text-sm px-3 py-1 rounded-full ${
                          post.category === "요가버디"
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {post.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* === 사이드바 === */}
            <div className="space-y-6">
              {/* 인기 챌린지 */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  인기 챌린지
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        30일 아침 요가
                      </h4>
                      <p className="text-sm text-gray-600">156명 참여 중</p>
                    </div>
                    <i className="fas fa-fire text-orange-500"></i>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        주 3회 명상
                      </h4>
                      <p className="text-sm text-gray-600">89명 참여 중</p>
                    </div>
                    <i className="fas fa-om text-purple-500"></i>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        유연성 향상
                      </h4>
                      <p className="text-sm text-gray-600">203명 참여 중</p>
                    </div>
                    <i className="fas fa-leaf text-green-500"></i>
                  </div>
                </div>
              </div>

              {/* 요가 버디 찾기 */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  요가 버디 찾기
                </h3>
                <p className="text-gray-600 mb-4">
                  같은 지역에서 함께 요가할 버디를 찾아보세요!
                </p>
                <button
                  onClick={openBuddyPage}
                  className="w-full px-4 py-2 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  요가 버디 찾기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 게시글 작성 모달 */}
      {isPostModalOpen && (
        <div
          className="modal fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
          onClick={hidePostModal}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform scale-100 transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">새 글 작성</h3>
                <button
                  onClick={hidePostModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>
            <form onSubmit={handlePostSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="post-title"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    제목
                  </label>
                  <input
                    type="text"
                    id="post-title"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="제목을 입력하세요"
                  />
                </div>
                <div>
                  <label
                    htmlFor="post-category"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    카테고리
                  </label>
                  <select
                    id="post-category"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="후기">후기</option>
                    <option value="질문">질문</option>
                    <option value="챌린지">챌린지</option>
                    <option value="팁">팁</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="post-content"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    내용
                  </label>
                  <textarea
                    id="post-content"
                    rows="8"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="내용을 입력하세요"
                  ></textarea>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={hidePostModal}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 gradient-bg text-white rounded-lg hover:shadow-lg transition-all"
                >
                  작성하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 게시글 상세 모달 */}
      {isDetailModalOpen && detailPost && (
        <div
          className="modal fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
          onClick={hidePostDetail}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform scale-100 transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  {detailPost.title}
                </h3>
                <button
                  onClick={hidePostDetail}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  커뮤니티로 돌아가기
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={detailPost.authorAvatar}
                  alt="작성자"
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {detailPost.authorName}
                    {detailPost.location && (
                      <span className="text-sm text-gray-500 ml-2">
                        ({detailPost.location})
                      </span>
                    )}
                  </h4>
                  <p className="text-sm text-gray-500">{detailPost.date}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">
                {detailPost.content}
              </p>
              <div className="flex items-center space-x-4 mb-6">
                <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors">
                  <i className="far fa-heart mr-1"></i> {detailPost.likes}
                </button>
                <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors">
                  <i className="far fa-comment mr-1"></i>{" "}
                  {detailPost.comments.length}
                </button>
              </div>
              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  onClick={() => handlePostDelete(detailPost.id)}
                  className="px-4 py-2 text-red-700 bg-red-200 rounded-lg hover:bg-red-300 transition-colors"
                >
                  게시글 삭제
                </button>
              </div>

              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  댓글
                </h4>
                <div className="space-y-4 mb-6">
                  {detailPost.comments.map((comment, index) => (
                    <div
                      key={comment.id || index}
                      className="flex items-start space-x-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 text-sm font-semibold text-gray-600">
                        {comment.authorName[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900">
                            {comment.authorName}
                          </span>
                          <span className="text-sm text-gray-500">
                            {comment.date}
                          </span>
                        </div>
                        <p className="text-gray-700 mt-1">{comment.content}</p>
                        <button
                          onClick={() => handleCommentDelete(comment.id)}
                          className="text-xs text-red-500 hover:underline mt-1"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleCommentSubmit} className="flex space-x-3">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="댓글을 입력하세요..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 gradient-bg text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    작성
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 요가 버디 찾기 모달 */}
      {showBuddyPage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-5xl h-full max-h-[90vh] rounded-2xl overflow-y-auto p-4 relative">
            <button
              onClick={closeBuddyPage}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>

            {/* 버디 관련 컴포넌트 */}
            <BuddyCreateForm onCreated={handleBuddyCreated} />
            <BuddyList posts={posts} />
          </div>
        </div>
      )}
    </>
  );
};

export default CommunityPage;
