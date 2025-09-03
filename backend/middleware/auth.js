const jwt = require("jsonwebtoken");
const User = require("../models/User");

// JWT 토큰 검증 미들웨어
exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "토큰이 없습니다. 로그인이 필요합니다." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: "비활성화된 계정입니다." });
    }

    req.user = { userId: user._id, role: user.role };
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "토큰이 만료되었습니다." });
    }

    console.error("인증 오류:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

// 권한 확인 미들웨어
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "인증이 필요합니다." });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "권한이 없습니다." });
    }

    next();
  };
};

// 선택적 인증 미들웨어 (토큰이 있으면 인증, 없어도 통과)
exports.optionalAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (user && user.isActive) {
        req.user = { userId: user._id, role: user.role };
      }
    }

    next();
  } catch (error) {
    // 토큰이 유효하지 않아도 그냥 통과
    next();
  }
};
