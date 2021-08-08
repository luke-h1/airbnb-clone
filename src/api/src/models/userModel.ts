import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { NextFunction } from 'express';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
userSchema.methods.matchPassword = async (enteredPassword: string) =>
  // @ts-ignore
  // eslint-disable-next-line implicit-arrow-linebreak
  await bcrypt.compare(enteredPassword, this.password);

//   @ts-ignore
userSchema.pre('save', async (next: NextFunction) => {
  // @ts-ignore

  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  // @ts-ignore
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model('User', userSchema);
export default User;
