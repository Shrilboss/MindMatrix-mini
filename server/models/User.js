// server/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true , required: true},
  password: String,
  googleId: String,
  role: { type: String, enum: ['college-credit-student', 'independent-student', 'professional', 'independent', 'college-access', 'looking-for-job', 'admin'], default: 'independent' },
  profile: {
    name: { type: String, default: '' },
    bio: { type: String, default: '' },
    phone: { type: String, default: '' },
    education: [{
      institution: String,
      degree: String,
      field: String,
      startDate: Date,
      endDate: Date,
      current: Boolean
    }],
    professional: [{
      company: String,
      position: String,
      startDate: Date,
      endDate: Date,
      current: Boolean
    }],
    skills: [String],
    careerInterests: [String],
    profileImage: String,
    bannerImage: String,
    mmCoins: { type: Number, default: 0 },
    engagement: {
      daily: { type: Number, default: 0 },
      weekly: { type: Number, default: 0 },
      monthly: { type: Number, default: 0 },
      streak: { type: Number, default: 0 }
    },
    collegeDetails: {
      state: String,
      university: String,
      college: String,
      enrollmentNumber: String
    }
  }
}, { timestamps: true });



// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);