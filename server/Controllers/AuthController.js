const express = require('express');
const UserModel = require('../models/user'); // Assuming this is your User model
const nodemailer = require('nodemailer');
const router = express.Router();
const bcrypt = require('bcrypt');
// Create transporter for nodemailer
const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com", // Use port 587 for TLS
//   secure: false, // true for 465, false for other ports
  service:'gmail',
  auth: {
    user: "chamala.ruthwik@gmail.com", // your Gmail address
    pass: "vgbnjqibrixgwtwn", // your Gmail app password
  },
});

// Send Email Function
const sendWelcomeEmail = async (email, username) => {
  try {
    const info = await transporter.sendMail({
      from: '"AgroShield" chamala.ruthwik@gmail.com', // sender address
      to: email, // receiver's email
      subject: "🎉 Welcome to Our Platform, " + username + "!", // Subject line
      text: `Hi ${username},\n\nWelcome to Our Platform!\n\nWe are thrilled to have you as part of our community. You can now explore all the features and services we offer. Should you have any questions, feel free to reach out to our support team.\n\nBest regards,\nThe YourApp Team`, // plain text body
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Welcome to Our Platform, ${username}!</h2>
          <p>Hi ${username},</p>
          <p>We are thrilled to have you on board. You can now explore all the features and services we offer.</p>
          <p>If you have any questions or need assistance, feel free to <a href="mailto:support@yourapp.com">reach out to our support team</a>.</p>
          <p>Enjoy your time with us!</p>
          <p>Best regards,</p>
          <p><strong>The AgroShield Team</strong></p>
          <hr/>
          <p>If you didn't sign up for this account, please ignore this email.</p>
        </div>
      `, // HTML body
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


const signup = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        

        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists! Please use different email.', username, success: false });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create the new user
        const user = new UserModel({ username, email, password: hashedPassword, role });
        await user.save();

        // Send welcome email
        await sendWelcomeEmail(email, username);

        // Respond with success message without generating a token
        return res.status(201).json({ message: 'User created successfully', username, success: true });

    } catch (error) {
        // Handle server error
        return res.status(500).json({ error: 'Server error during signup', success: false });
    }
};


// Login Route Handler
const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists
      const userExist = await UserModel.findOne({ email });
      if (!userExist) {
        return res.status(400).json({ success: false, message: 'Invalid email' }); // Specific error message for invalid email
      }
      
      // Compare the input password with the hashed password stored in DB
      const isPasswordValid = await bcrypt.compare(password, userExist.password);
      if (isPasswordValid) {
        return res.status(401).json({ success: false, message: 'Invalid password' }); // Specific error message for invalid password
      }
  
      // If password matches, generate a JWT token
      const token = await userExist.generateToken(); // Assuming you have a method to generate tokens in the user model
  
      // Respond with a success message and the token
      return res.status(200).json({
        success: true,
        message: 'Login Successful',
        token, // JWT Token
        username: userExist.username.toString(), // Returning username for frontend use
        name: userExist.name // Assuming the user model has a 'name' field
      });
    } catch (error) {
      // Handle any internal server errors
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };


module.exports = {
    signup , login
};
