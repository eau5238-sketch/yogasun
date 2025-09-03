const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "이름은 필수입니다"],
      trim: true,
      maxlength: [50, "이름은 50자를 초과할 수 없습니다"],
    },
    email: {
      type: String,
      required: [true, "이메일은 필수입니다"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "유효한 이메일을 입력해주세요",
      ],
    },
    password: {
      type: String,
      required: function () {
        return !this.socialLogin;
      },
      minlength: [6, "비밀번호는 최소 6자 이상이어야 합니다"],
    },
    socialLogin: {
      provider: String, // 'kakao', 'google', 'naver'
      providerId: String,
    },
    role: {
      type: String,
      enum: ["user", "instructor", "admin"],
      default: "user",
    },
    profile: {
      avatar: String,
      phone: String,
      birthDate: Date,
      gender: {
        type: String,
        enum: ["male", "female", "other"],
      },
      yogaLevel: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        default: "beginner",
      },
      healthGoals: [String],
      medicalConditions: [String],
    },
    subscription: {
      type: {
        type: String,
        enum: ["free", "basic", "premium"],
        default: "free",
      },
      startDate: Date,
      endDate: Date,
      autoRenew: {
        type: Boolean,
        default: false,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: Date,
  },
  {
    timestamps: true,
  }
);

// 비밀번호 암호화 미들웨어
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// 비밀번호 비교 메서드
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// JSON 변환 시 비밀번호 제외
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model("User", userSchema);
