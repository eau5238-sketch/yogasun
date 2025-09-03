const YogaClass = require("../models/YogaClass");
const User = require("../models/User");
const Booking = require("../models/Booking");

// 모든 요가 수업 조회
exports.getClasses = async (req, res) => {
  try {
    const {
      category,
      difficulty,
      instructor,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
      sort = "createdAt",
    } = req.query;

    // 필터 조건 구성
    const filter = { isActive: true };

    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (instructor) filter.instructor = instructor;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }

    // 정렬 옵션
    const sortOptions = {};
    if (sort === "price_asc") sortOptions.price = 1;
    else if (sort === "price_desc") sortOptions.price = -1;
    else if (sort === "rating") sortOptions["rating.average"] = -1;
    else sortOptions.createdAt = -1;

    const classes = await YogaClass.find(filter)
      .populate("instructor", "name profile.avatar")
      .populate("currentParticipants")
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await YogaClass.countDocuments(filter);

    // 더미 데이터 추가 (실제 데이터가 없을 경우)
    if (classes.length === 0) {
      const dummyClasses = [
        {
          id: 1,
          title: "초보자를 위한 하타 요가",
          instructor: "김*련",
          duration: 60,
          difficulty: "beginner",
          price: 25000,
          image:
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
          description:
            "요가를 처음 시작하는 분들을 위한 기초 하타 요가 수업입니다.",
        },
        {
          id: 2,
          title: "심신 안정 명상 요가",
          instructor: "박*온",
          duration: 45,
          difficulty: "intermediate",
          price: 30000,
          image:
            "https://images.unsplash.com/photo-1506126613408-eca07ce68e71?w=400",
          description: "명상과 요가를 결합한 심신 안정 프로그램입니다.",
        },
        {
          id: 3,
          title: "파워 비니야사 플로우",
          instructor: "이*력",
          duration: 75,
          difficulty: "advanced",
          price: 35000,
          image:
            "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400",
          description: "역동적인 플로우로 체력을 기르는 파워 요가 수업입니다.",
        },
        {
          id: 4,
          title: "기초 하타 요가",
          description:
            "요가를 처음 시작하는 분들을 위한 기본 자세와 호흡법을 배우는 수업",
          instructor: "김*련",
          duration: "30",
          level: "beginner",
          thumbnail:
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
          videoUrl: "https://example.com/video1.mp4",
        },
        {
          id: 5,
          title: "릴렉스 요가",
          description: "하루의 피로를 풀어주는 편안한 스트레칭과 명상",
          instructor: "박*온",
          duration: "25",
          level: "beginner",
          thumbnail:
            "https://images.unsplash.com/photo-1506126613408-eca07ce68e71?w=400&h=300&fit=crop",
          videoUrl: "https://example.com/video2.mp4",
        },
        {
          id: 6,
          title: "모닝 요가",
          description: "활기찬 하루를 시작하는 에너지 충전 요가",
          instructor: "이*력",
          duration: "20",
          level: "intermediate",
          thumbnail:
            "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=300&fit=crop",
          videoUrl: "https://example.com/video3.mp4",
        },
      ];

      return res.json({
        classes: dummyClasses,
        pagination: {
          current: parseInt(page),
          pages: 1,
          total: dummyClasses.length,
        },
      });
    }

    res.json({
      classes,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    console.error("수업 조회 오류:", error);
    res.status(500).json({
      message: "서버 오류가 발생했습니다.",
      error: process.env.NODE_ENV === "development" ? error.message : {},
    });
  }
};

// 특정 요가 수업 조회
exports.getClass = async (req, res) => {
  try {
    const yogaClass = await YogaClass.findById(req.params.id)
      .populate("instructor", "name profile email")
      .populate("currentParticipants");

    if (!yogaClass) {
      return res.status(404).json({ message: "수업을 찾을 수 없습니다." });
    }

    res.json(yogaClass);
  } catch (error) {
    console.error("수업 상세 조회 오류:", error);
    res.status(500).json({
      message: "서버 오류가 발생했습니다.",
      error: process.env.NODE_ENV === "development" ? error.message : {},
    });
  }
};

// 강사 목록 조회
exports.getInstructors = async (req, res) => {
  try {
    const instructors = await User.find({
      role: "instructor",
      isActive: true,
    }).select("name profile email");

    // 더미 데이터 추가 (실제 데이터가 없을 경우)
    if (instructors.length === 0) {
      const dummyInstructors = [
        {
          id: 1,
          name: "김*련",
          specialty: "하타 요가, 초보자 지도",
          experience: "8년",
          rating: 4.9,
          image:
            "https://images.unsplash.com/photo-1594824226453-5d8ecd5c0d49?w=300",
        },
        {
          id: 2,
          name: "박*온",
          specialty: "명상 요가, 스트레스 관리",
          experience: "12년",
          rating: 4.8,
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300",
        },
        {
          id: 3,
          name: "이*력",
          specialty: "파워 요가, 체력 강화",
          experience: "10년",
          rating: 4.7,
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
        },
      ];

      return res.json(dummyInstructors);
    }

    res.json(instructors);
  } catch (error) {
    console.error("강사 목록 조회 오류:", error);
    res.status(500).json({
      message: "서버 오류가 발생했습니다.",
      error: process.env.NODE_ENV === "development" ? error.message : {},
    });
  }
};

// 수업 예약
exports.bookClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const { bookingDate, notes } = req.body;
    const userId = req.user.userId;

    // 수업 존재 확인
    const yogaClass = await YogaClass.findById(classId);
    if (!yogaClass) {
      return res.status(404).json({ message: "수업을 찾을 수 없습니다." });
    }

    // 이미 예약했는지 확인
    const existingBooking = await Booking.findOne({
      user: userId,
      class: classId,
      bookingDate: new Date(bookingDate),
      status: { $in: ["pending", "confirmed"] },
    });

    if (existingBooking) {
      return res.status(400).json({ message: "이미 예약된 수업입니다." });
    }

    // 예약 생성
    const booking = new Booking({
      user: userId,
      class: classId,
      bookingDate: new Date(bookingDate),
      amount: yogaClass.price,
      notes: notes || "",
      status: "confirmed", // 실제로는 결제 후 confirmed 상태로 변경
      paymentStatus: "paid", // 실제로는 결제 시스템 연동 필요
    });

    await booking.save();

    const populatedBooking = await Booking.findById(booking._id)
      .populate("class", "title instructor duration")
      .populate("user", "name email");

    res.status(201).json({
      message: "수업 예약이 완료되었습니다.",
      booking: populatedBooking,
    });
  } catch (error) {
    console.error("수업 예약 오류:", error);
    res.status(500).json({
      message: "서버 오류가 발생했습니다.",
      error: process.env.NODE_ENV === "development" ? error.message : {},
    });
  }
};

// 사용자 예약 목록 조회
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId })
      .populate("class", "title instructor duration image")
      .populate({
        path: "class",
        populate: {
          path: "instructor",
          select: "name",
        },
      })
      .sort("-createdAt");

    res.json(bookings);
  } catch (error) {
    console.error("예약 목록 조회 오류:", error);
    res.status(500).json({
      message: "서버 오류가 발생했습니다.",
      error: process.env.NODE_ENV === "development" ? error.message : {},
    });
  }
};
