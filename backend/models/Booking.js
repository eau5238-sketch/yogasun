const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "사용자 정보는 필수입니다"],
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "YogaClass",
      required: [true, "수업 정보는 필수입니다"],
    },
    bookingDate: {
      type: Date,
      required: [true, "예약 날짜는 필수입니다"],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed", "no-show"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded", "failed"],
      default: "pending",
    },
    paymentId: String, // 결제 시스템의 결제 ID
    amount: {
      type: Number,
      required: [true, "결제 금액은 필수입니다"],
    },
    notes: String, // 특별 요청사항
    attendance: {
      checkedIn: {
        type: Boolean,
        default: false,
      },
      checkedInAt: Date,
      checkedOut: {
        type: Boolean,
        default: false,
      },
      checkedOutAt: Date,
    },
    review: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: String,
      reviewedAt: Date,
    },
    cancellation: {
      reason: String,
      cancelledAt: Date,
      refundAmount: Number,
    },
  },
  {
    timestamps: true,
  }
);

// 복합 인덱스: 같은 사용자가 같은 수업, 같은 날짜에 중복 예약 방지
bookingSchema.index({ user: 1, class: 1, bookingDate: 1 }, { unique: true });

// 예약 취소 메서드
bookingSchema.methods.cancel = function (reason) {
  this.status = "cancelled";
  this.cancellation = {
    reason: reason,
    cancelledAt: new Date(),
  };
  return this.save();
};

// 체크인 메서드
bookingSchema.methods.checkIn = function () {
  this.attendance.checkedIn = true;
  this.attendance.checkedInAt = new Date();
  if (this.status === "confirmed") {
    this.status = "completed";
  }
  return this.save();
};

module.exports = mongoose.model("Booking", bookingSchema);
