require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5001;

// 몽고디비 연결
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/yogaspace", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB에 성공적으로 연결되었습니다."))
  .catch((err) => console.error("❌ MongoDB 연결 실패:", err));

// 미들웨어
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// 라우터 가져오기
const authRoutes = require("./routes/auth");
const yogaRoutes = require("./routes/yoga");

// 기본 라우트
app.get("/", (req, res) => {
  res.json({ message: "Yoga Platform API Server" });
});

// 헬스체크 엔드포인트
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// 라우터 사용
app.use("/api/auth", authRoutes);
app.use("/api/yoga", yogaRoutes);

// 404 에러 처리
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    requestedUrl: req.originalUrl,
    method: req.method,
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중입니다`);
  console.log(`📡 프론트엔드에서 http://localhost:${PORT}/api/* 로 요청하세요`);
});

// 에러 처리
process.on("uncaughtException", (error) => {
  console.error("🚨 Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("🚨 Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});
