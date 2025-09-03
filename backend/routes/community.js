const express = require("express");
const router = express.Router();
const { authenticate, optionalAuth } = require("../middleware/auth");

// 커뮤니티 게시글 목록
router.get("/posts", optionalAuth, (req, res) => {
  // 더미 데이터
  const posts = [
    {
      id: 1,
      title: "초보자를 위한 요가 팁",
      author: "요가러버",
      date: "2025-08-15",
      likes: 24,
      comments: 8,
    },
    {
      id: 2,
      title: "요가 매트 추천 부탁드려요",
      author: "건강한삶",
      date: "2025-08-14",
      likes: 15,
      comments: 12,
    },
    {
      id: 3,
      title: "아침 요가 루틴 공유합니다",
      author: "새벽요가",
      date: "2025-08-13",
      likes: 32,
      comments: 6,
    },
  ];

  res.json(posts);
});

// 게시글 작성 (로그인 필수)
router.post("/posts", authenticate, (req, res) => {
  res.json({ message: "게시글 작성 완료 (개발 예정)" });
});

module.exports = router;
