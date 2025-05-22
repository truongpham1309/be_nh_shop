import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true
    },
    full_name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      select: false // ẩn khi truy vấn
    },
    gender: {
      type: String,
      enum: ['Nam', 'Nữ'],
      default: 'Nam'
    },
    birth_date: {
      type: Date
    },
    avatar: {
      type: String
    },
    status: {
      type: String,
      enum: ['Kích hoạt', 'Chưa kích hoạt'],
      default: 'Chưa kích hoạt'
    },
    email_verification_token: {
      type: String
    },
    email_verified_at: {
      type: Date
    },
    remember_token: {
      type: String,
      select: false
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      select: false
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      select: false
    }
  },
  {
    timestamps: true
  }
);

// Constants
UserSchema.statics.GENDER_MALE = 'Nam';
UserSchema.statics.GENDER_FEMALE = 'Nữ';
UserSchema.statics.STATUS_ACTIVE = 'Kích hoạt';
UserSchema.statics.STATUS_INACTIVE = 'Chưa kích hoạt';

export default mongoose.model('User', UserSchema);
