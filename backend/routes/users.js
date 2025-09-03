const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");

// 사용자 목록 조회 (관리자만)
router.get("/", authenticate, authorize("admin"), async (req, res) => {
  // 관리자용 사용자 목록 조회 로직
  res.json({ message: "사용자 목록 조회 (개발 예정)" });
});

module.exports = router;
