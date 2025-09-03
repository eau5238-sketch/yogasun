const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticate } = require("../middleware/auth");

// 회원가입
router.post("/register", authController.register);

// 로그인
router.post("/login", authController.login);

// 로그아웃
router.post("/logout", authController.logout);

// 프로필 조회 (인증 필요)
router.get("/profile", authenticate, authController.getProfile);

// 프로필 수정 (인증 필요)
router.put("/profile", authenticate, authController.updateProfile);

module.exports = router;
