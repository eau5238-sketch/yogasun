require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const YogaClass = require("../models/YogaClass");

const seedData = async () => {
  try {
    // 데이터베이스 연결
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ 시드 데이터베이스 연결 성공");

    // 기존 데이터 삭제 (주의: 개발 환경에서만 사용)
    if (process.env.NODE_ENV === "development") {
      await User.deleteMany({});
      await YogaClass.deleteMany({});
      console.log("🗑️ 기존 데이터 삭제 완료");
    }

    // 강사 계정 생성
    const instructors = await User.create([
      {
        name: "김*련",
        email: "instructor1@yoga.com",
        password: "password123",
        role: "instructor",
        profile: {
          yogaLevel: "advanced",
          healthGoals: ["전문 강사", "요가 철학 연구"],
        },
      },
      {
        name: "박*온",
        email: "instructor2@yoga.com",
        password: "password123",
        role: "instructor",
        profile: {
          yogaLevel: "advanced",
          healthGoals: ["명상 지도", "스트레스 해소"],
        },
      },
    ]);

    console.log("👨‍🏫 강사 계정 생성 완료");

    // 테스트 사용자 생성
    const testUser = await User.create({
      name: "테스트 사용자",
      email: "test@yoga.com",
      password: "password123",
      role: "user",
      profile: {
        yogaLevel: "beginner",
        healthGoals: ["유연성 향상", "스트레스 해소"],
      },
    });

    console.log("👤 테스트 사용자 생성 완료");

    // 요가 수업 생성
    const yogaClasses = await YogaClass.create([
      {
        title: "초보자를 위한 하타 요가",
        description:
          "요가를 처음 시작하는 분들을 위한 기초 하타 요가 수업입니다.",
        instructor: instructors[0]._id,
        category: "hatha",
        difficulty: "beginner",
        duration: 60,
        price: 25000,
        maxParticipants: 15,
        schedule: [
          {
            dayOfWeek: 1, // 월요일
            startTime: "10:00",
            endTime: "11:00",
          },
        ],
        location: {
          type: "offline",
          address: "서울시 강남구 요가스튜디오",
          room: "A룸",
        },
      },
      {
        title: "심신 안정 명상 요가",
        description: "명상과 요가를 결합한 심신 안정 프로그램입니다.",
        instructor: instructors[1]._id,
        category: "meditation",
        difficulty: "intermediate",
        duration: 45,
        price: 30000,
        maxParticipants: 12,
        schedule: [
          {
            dayOfWeek: 3, // 수요일
            startTime: "19:00",
            endTime: "19:45",
          },
        ],
        location: {
          type: "hybrid",
          address: "서울시 서초구 요가스튜디오",
          room: "B룸",
          zoomLink: "https://zoom.us/j/meditation",
        },
      },
    ]);

    console.log("🧘‍♀️ 요가 수업 생성 완료");

    console.log("🎉 시드 데이터 생성 완료!");
    console.log(`생성된 강사: ${instructors.length}명`);
    console.log(`생성된 수업: ${yogaClasses.length}개`);

    process.exit(0);
  } catch (error) {
    console.error("❌ 시드 데이터 생성 실패:", error);
    process.exit(1);
  }
};

seedData();
