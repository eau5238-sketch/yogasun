import React, { useState } from "react";

const CommunityModals = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [detailPost, setDetailPost] = useState({
    title: "",
    authorName: "",
    authorAvatar: "",
    date: "",
    content: "",
    images: [], // ✅ 변경: 단일 이미지 → 다중 이미지
    likes: 0,
    comments: 0,
  });

  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const [imageFiles, setImageFiles] = useState([]); // ✅ 다중 이미지 파일
  const [imagePreviews, setImagePreviews] = useState([]); // ✅ 다중 이미지 미리보기

  const showPostModal = () => setIsPostModalOpen(true);
  const hidePostModal = () => {
    setIsPostModalOpen(false);
    setImageFiles([]);
    setImagePreviews([]);
  };

  const showPostDetail = (post) => {
    setDetailPost(post);
    setIsDetailModalOpen(true);
  };

  const hidePostDetail = () => setIsDetailModalOpen(false);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const title = e.target["post-title"].value;
    const category = e.target["post-category"].value;
    const content = e.target["post-content"].value;

    console.log("게시글 제출:", {
      title,
      category,
      content,
      images: imageFiles,
    });

    // 게시글 저장
    setDetailPost({
      title,
      authorName: "새로운 유저",
      authorAvatar: "https://via.placeholder.com/150",
      date: new Date().toLocaleString(),
      content,
      images: imagePreviews, // ✅ 다중 이미지 저장
      likes: 0,
      comments: 0,
    });

    hidePostModal();
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim() === "") return;
    setComments([...comments, commentInput.trim()]);
    setCommentInput("");
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImageFiles(files);
    setImagePreviews(previews);
  };

  return (
    <>
      {/* 게시글 작성 모달 */}
      {isPostModalOpen && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full m-4 max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
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
            <form onSubmit={handlePostSubmit} className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="post-title"
                  className="block mb-2 text-sm font-medium text-gray-700"
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
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  카테고리
                </label>
                <select
                  id="post-category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="review">후기</option>
                  <option value="question">질문</option>
                  <option value="challenge">챌린지</option>
                  <option value="tip">팁</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="post-content"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  내용
                </label>
                <textarea
                  id="post-content"
                  rows="6"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="내용을 입력하세요"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="post-image"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  관련 이미지 (여러 장 선택 가능)
                </label>
                <input
                  type="file"
                  id="post-image"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="w-full"
                />
                {imagePreviews.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-4">
                    {imagePreviews.map((preview, idx) => (
                      <img
                        key={idx}
                        src={preview}
                        alt={`미리보기 ${idx + 1}`}
                        className="w-full h-auto rounded-lg object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={hidePostModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
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
      {isDetailModalOpen && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full m-4 max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  {detailPost.title}
                </h3>
                <button
                  onClick={hidePostDetail}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times text-xl"></i>
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
                  </h4>
                  <p className="text-sm text-gray-500">{detailPost.date}</p>
                </div>
              </div>

              {/* 다중 이미지 렌더링 */}
              {detailPost.images && detailPost.images.length > 0 && (
                <div className="mb-4 grid grid-cols-2 gap-4">
                  {detailPost.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`게시글 이미지 ${idx + 1}`}
                      className="w-full h-auto rounded-lg object-cover"
                    />
                  ))}
                </div>
              )}

              <div className="prose max-w-none mb-6">{detailPost.content}</div>

              <div className="flex items-center space-x-4 mb-6">
                <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors">
                  <i className="far fa-heart mr-1"></i> {detailPost.likes}
                </button>
                <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors">
                  <i className="far fa-comment mr-1"></i> {detailPost.comments}
                </button>
              </div>

              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  댓글
                </h4>
                <div className="space-y-4 mb-6">
                  {comments.map((c, idx) => (
                    <div key={idx} className="p-3 bg-gray-100 rounded-lg">
                      {c}
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
    </>
  );
};

export default CommunityModals;
