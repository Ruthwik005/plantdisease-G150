const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');  // Import JWT for token generation
const bcrypt = require('bcryptjs');   // Ensure bcrypt is available for password hashing
const { Schema } = mongoose;

// Define the schema for the User
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Agro Scientist', 'Farmer', 'Student', 'Others'], // Restrict role to these options
    default: 'Agro Scientist',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Method to generate JWT token
UserSchema.methods.generateToken = function () {
  // Use JWT to sign a token containing the user's ID and role, valid for 24h
  const token = jwt.sign(
    {
      userId: this.username,
      role: this.role,
    },
    process.env.JWT_SECRET, // Make sure this is defined in your .env file
    { expiresIn: '24h' }    // Token expiration set to 24 hours
  );
  return token;
};

// Password hashing middleware before saving the user
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    // If password is modified or new, hash the password before saving
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
