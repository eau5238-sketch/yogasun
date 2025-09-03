const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// JWT 토큰 생성
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "30d",
  });
};

// 회원가입
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 입력값 검증
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "이름, 이메일, 비밀번호는 필수입니다.",
      });
    }

    // 이메일 중복 확인
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "이미 사용 중인 이메일입니다.",
      });
    }

    // 새 사용자 생성
    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    // JWT 토큰 생성
    const token = generateToken(user._id);

    res.status(201).json({
      message: "회원가입이 완료되었습니다.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("회원가입 오류:", error);
    res.status(500).json({
      message: "서버 오류가 발생했습니다.",
      error: process.env.NODE_ENV === "development" ? error.message : {},
    });
  }
};

// 로그인
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 입력값 검증
    if (!email || !password) {
      return res.status(400).json({
        message: "이메일과 비밀번호를 입력해주세요.",
      });
    }

    // 사용자 찾기
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "이메일 또는 비밀번호가 올바르지 않습니다.",
      });
    }

    // 비밀번호 확인
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "이메일 또는 비밀번호가 올바르지 않습니다.",
      });
    }

    // 계정 상태 확인
    if (!user.isActive) {
      return res.status(401).json({
        message: "비활성화된 계정입니다. 관리자에게 문의해주세요.",
      });
    }

    // 마지막 로그인 시간 업데이트
    user.lastLogin = new Date();
    await user.save();

    // JWT 토큰 생성
    const token = generateToken(user._id);

    res.json({
      message: "로그인 성공",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: user.profile,
      },
      token,
    });
  } catch (error) {
    console.error("로그인 오류:", error);
    res.status(500).json({
      message: "서버 오류가 발생했습니다.",
      error: process.env.NODE_ENV === "development" ? error.message : {},
    });
  }
};

// 프로필 조회
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    res.json(user);
  } catch (error) {
    console.error("프로필 조회 오류:", error);
    res.status(500).json({
      message: "서버 오류가 발생했습니다.",
      error: process.env.NODE_ENV === "development" ? error.message : {},
    });
  }
};

// 프로필 업데이트
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const allowedUpdates = ["name", "profile", "phone"];
    const filteredUpdates = {};

    // 허용된 필드만 업데이트
    Object.keys(updates).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      filteredUpdates,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    res.json({
      message: "프로필이 업데이트되었습니다.",
      user,
    });
  } catch (error) {
    console.error("프로필 업데이트 오류:", error);
    res.status(500).json({
      message: "서버 오류가 발생했습니다.",
      error: process.env.NODE_ENV === "development" ? error.message : {},
    });
  }
};

// 로그아웃 (클라이언트에서 토큰 삭제)
exports.logout = (req, res) => {
  res.json({ message: "로그아웃되었습니다." });
};
