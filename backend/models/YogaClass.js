const mongoose = require("mongoose");

const yogaClassSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "수업 제목은 필수입니다"],
      trim: true,
      maxlength: [100, "제목은 100자를 초과할 수 없습니다"],
    },
    description: {
      type: String,
      required: [true, "수업 설명은 필수입니다"],
      maxlength: [1000, "설명은 1000자를 초과할 수 없습니다"],
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "강사 정보는 필수입니다"],
    },
    category: {
      type: String,
      required: [true, "수업 카테고리는 필수입니다"],
      enum: [
        "hatha",
        "vinyasa",
        "ashtanga",
        "bikram",
        "yin",
        "power",
        "meditation",
      ],
    },
    difficulty: {
      type: String,
      required: [true, "난이도는 필수입니다"],
      enum: ["beginner", "intermediate", "advanced"],
    },
    duration: {
      type: Number,
      required: [true, "수업 시간은 필수입니다"],
      min: [15, "최소 15분 이상이어야 합니다"],
      max: [180, "최대 180분을 초과할 수 없습니다"],
    },
    price: {
      type: Number,
      required: [true, "가격은 필수입니다"],
      min: [0, "가격은 0원 이상이어야 합니다"],
    },
    maxParticipants: {
      type: Number,
      required: [true, "최대 참여자 수는 필수입니다"],
      min: [1, "최소 1명 이상이어야 합니다"],
      max: [50, "최대 50명을 초과할 수 없습니다"],
    },
    schedule: [
      {
        dayOfWeek: {
          type: Number, // 0: 일요일, 1: 월요일, ..., 6: 토요일
          required: true,
          min: 0,
          max: 6,
        },
        startTime: {
          type: String, // "09:00" 형식
          required: true,
          match: [
            /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
            "올바른 시간 형식을 입력해주세요 (HH:MM)",
          ],
        },
        endTime: {
          type: String,
          required: true,
          match: [
            /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
            "올바른 시간 형식을 입력해주세요 (HH:MM)",
          ],
        },
      },
    ],
    location: {
      type: {
        type: String,
        enum: ["online", "offline", "hybrid"],
        default: "offline",
      },
      address: String,
      room: String,
      zoomLink: String,
    },
    image: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    },
    tags: [String],
    equipment: [String], // 필요한 도구들
    benefits: [String], // 수업의 이점들
    prerequisites: [String], // 사전 요구사항
    isActive: {
      type: Boolean,
      default: true,
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

// 가상 필드: 현재 등록된 참여자 수
yogaClassSchema.virtual("currentParticipants", {
  ref: "Booking",
  localField: "_id",
  foreignField: "class",
  count: true,
  match: { status: "confirmed" },
});

// JSON 출력 시 가상 필드 포함
yogaClassSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("YogaClass", yogaClassSchema);
